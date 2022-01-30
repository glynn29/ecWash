import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

import formStyles from "../../../../../../components/UI/Styles/formStyle";
import { storageRef } from "../../../../../../firebase";
import CustomLinearProgress from "../../../../../../components/UI/LinearProgress/CustomLinearProgress";
import PictureButton from "../../../../../../components/UI/Buttons/PictureButton";

const AddForm = props => {
    const styles = formStyles();
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [details, setDetails] = useState("");
    const [category, setCategory] = useState("");
    const [tempPicture, setTempPicture] = useState(null);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    //functions for showing a temporary photo before an actual upload
    const handleAddPictureClick = event => {
        const file = event.target.files[0];
        setFile(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function () {
            setTempPicture(reader.result);
        };
    };

    const handleRemovePictureClick = () => {
        setTempPicture(null);
    };

    //function to upload file to firebase
    const handleFileUpload = () => {
        setIsLoading(true);
        try {
            const uploadTask = storageRef.child(category)
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
        let pictureUrl = null;
        let pictureError = false;

        if (file) {
            await handleFileUpload()
                .then(function (url) {
                    pictureUrl = url;
                })
                .catch(function (error) {
                    pictureError = true;
                });
        }

        const part = {
            name,
            code,
            details,
            category,
            pictureUrl,
            amount: 1
        };

        if (!pictureError) {
            props.onAdd(part);
            console.log("part ADDED");
        }
    };

    return (
        <Container component="main" maxWidth="sm" className={styles.Container}>
            <form autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
                        <FormControl className={styles.formControl}>
                            <TextField
                                value={code}
                                onChange={event => setCode(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="code"
                                label="Part Code"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={styles.formControl} required>
                            <InputLabel required>Part Category</InputLabel>
                            <Select
                                native
                                value={category}
                                onChange={event => setCategory(event.target.value)}
                                label="Part Category"
                            >
                                <option aria-label="None" value=""/>
                                {props.categories.map(listItem => {
                                    return (
                                        <option key={listItem.name} value={listItem.name}>{listItem.name}</option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={styles.formControl}>
                            <TextField
                                value={details}
                                onChange={event => setDetails(event.target.value)}
                                id="description"
                                label="Part Description"
                                multiline
                                variant="outlined"
                                fullWidth
                                rows={2}
                                inputProps={{className: styles.textarea}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sm={2} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <PictureButton tempPicture={tempPicture} handleRemovePictureClick={handleRemovePictureClick}
                                       handleAddPictureClick={handleAddPictureClick}/>
                    </Grid>
                    <Grid item xs={9} sm={10} style={{outline: '1px dotted lightgray', outlineOffset: '-8px'}}>
                        {tempPicture &&
                        <img src={tempPicture} alt={"error"} style={{
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
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Add Part
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default AddForm;
