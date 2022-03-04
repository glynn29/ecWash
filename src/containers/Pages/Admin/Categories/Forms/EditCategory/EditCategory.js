import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import Compressor from "compressorjs";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PictureButton from "../../../../../../components/UI/Buttons/PictureButton";
import CustomLinearProgress from "../../../../../../components/UI/LinearProgress/CustomLinearProgress";

import formStyles from "../../../../../../components/UI/Styles/formStyle";
import { firestore, storageRef } from "../../../../../../firebase";

const EditCategory = props => {
    const styles = formStyles();
    const [name, setName] = useState(props.formData.name);
    const [tempPictureUrl, setTempPictureUrl] = useState(props.formData.pictureUrl ? props.formData.pictureUrl : null);
    const [isPictureRemoved, setIsPictureRemoved] = useState(false);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    //functions for showing a temporary photo before an actual upload
    const handleAddPictureClick = event => {
        const file = event.target.files[0];
        compressFile(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function () {
            setTempPictureUrl(reader.result);
        };
    };

    const compressFile = (image) => {
        setIsLoading(true);
        new Compressor(image, {
            quality: 0.65,
            success: (compressedResult) => {
                setFile(compressedResult);
                setIsLoading(false);
            },
            error(err) {
                setError(err.message);
                setIsLoading(false);
            },
        });
    };

    const handleRemovePictureClick = () => {
        setTempPictureUrl(null);
        setIsPictureRemoved(true);
    };

    const deletePhotoFromStorage = () => {
        try {
            const deleteRef = storageRef.child('categories')
                .child(name);
            return new Promise((resolve, reject) => {
                deleteRef.delete()
                    .then(() => {
                        resolve("success");
                    })
                    .catch((error) => {
                        setError(error);
                        reject(error);
                    });
            })
        } catch (e) {
            setError(e.message);
            return Promise.reject();
        }
    };

    //function to upload file to firebase
    const handleFileUpload = () => {
        setIsLoading(true);
        try {
            const uploadTask = storageRef.child('categories')
                .child(name)
                .put(file);
            return new Promise((resolve, reject) => {
                uploadTask.on('state_changed', (snapshot) => {
                                  let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                  setProgress(progress);
                                  console.log('Upload is ' + progress + '% done');
                              },
                              (error) => {
                                  setError(error.message);
                                  setIsLoading(false);
                                  reject(error.message);
                              },
                              () => {
                                  uploadTask.snapshot.ref.getDownloadURL()
                                      .then((downloadURL) => {
                                          setIsLoading(false);
                                          resolve(downloadURL);
                                      });
                              });
            });
        } catch (e) {
            setError(e.message);
            return Promise.reject();
        }
    };

    const submitFormHandler = async (event) => {
        event.preventDefault();
        let pictureUrl = tempPictureUrl;
        let pictureError = false;

        if (isPictureRemoved) {
            await deletePhotoFromStorage()
                .then(function () {
                    pictureUrl = null;
                })
                .catch(function (error) {
                    pictureError = true;
                });
        }

        if (file && !pictureError) {
            await handleFileUpload()
                .then(function (url) {
                    pictureUrl = url;
                })
                .catch(function (error) {
                    pictureError = true;
                });
        }

        if (!pictureError) {
            firestore.collection('categories')
                .doc(props.formData.id)
                .update({
                            name,
                            pictureUrl: pictureUrl,
                        })
                .then(() => {
                    props.onEdit();
                })
                .catch(error => {
                    console.log(error)
                });
            console.log("category EDITED");
        }
    };

    return (
        <Container component="main" maxWidth="sm" className={styles.Container}>
            <form autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl className={styles.formControl}>
                            <TextField
                                value={name}
                                onChange={event => setName(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Part Name"
                                autoFocus
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sm={2} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <PictureButton tempPicture={tempPictureUrl} handleRemovePictureClick={handleRemovePictureClick}
                                       handleAddPictureClick={handleAddPictureClick} disabled={isLoading}/>
                    </Grid>
                    <Grid item xs={9} sm={10} style={{outline: '1px dotted lightgray', outlineOffset: '-8px'}}>
                        {tempPictureUrl &&
                            <img src={tempPictureUrl} alt={"error"} style={{
                                margin: 'auto',
                                display: 'block',
                                padding: 'inherit',
                                maxHeight: 129
                            }}/>
                        }
                    </Grid>
                    {(isLoading || progress === 100) &&
                    <Grid item xs={12}>
                        <CustomLinearProgress value={progress}/>
                    </Grid>}
                    {error &&
                    <Grid item xs={12}>
                        <Typography color={"error"}>{error}</Typography>
                    </Grid>}
                    <Grid item xs={10} style={{margin: 'auto'}}>
                        <Button
                            disabled={isLoading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Save Category
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default EditCategory;
