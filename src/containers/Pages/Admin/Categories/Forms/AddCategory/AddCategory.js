import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import PictureButton from "../../../../../../components/UI/Buttons/PictureButton";
import CustomLinearProgress from "../../../../../../components/UI/LinearProgress/CustomLinearProgress";
import formStyles from "../../../../../../components/UI/Styles/formStyle";
import { firestore, storageRef } from "../../../../../../firebase";
import { compressFile, handleFileUpload } from "../../../../../../components/UI/Helper/Helper";

const AddCategory = props => {
    const styles = formStyles();
    const [name, setName] = useState("");
    const [tempPicture, setTempPicture] = useState(null);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    //functions for showing a temporary photo before an actual upload, and compressing image
    const handleAddPictureClick = async (event) => {
        const file = event.target.files[0];
        setIsLoading(true);
        await compressFile(file, false)
            .then(compressedResult => setFile(compressedResult))
            .catch(error => setError(error));
        setIsLoading(false);
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function () {
            setTempPicture(reader.result);
        };
    };

    const handleRemovePictureClick = () => {
        setTempPicture(null);
    };

    const submitFormHandler = async (event) => {
        event.preventDefault();
        let pictureUrl = null;
        let picName = null;
        let pictureError = false;
        const categoryRef = firestore.collection('categories')
            .doc();

        if (file) {
            picName = file.name.substring(0, file.name.indexOf('.'));
            const uploadTask = storageRef.child('categories')
                .child(categoryRef.id)
                .put(file);
            setIsLoading(true);
            await handleFileUpload(uploadTask, setProgress)
                .then(function (url) {
                    pictureUrl = url;
                })
                .catch(function (error) {
                    setError(error.message);
                    pictureError = true;
                });
            setIsLoading(false);
        }

        if (!pictureError) {
            const category = {
                name,
                pictureUrl: pictureUrl,
                pictureName: picName
            };
            firestore.collection('categories')
                .doc(categoryRef.id)
                .set(category)
                .then(() => {
                    props.onAdd();
                })
                .catch(error => {
                    setError(error.message);
                    console.log(error)
                });
        }
    };

    return (
        <Container component="main" maxWidth="sm" className={styles.container}>
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
                        <PictureButton tempPicture={tempPicture} handleRemovePictureClick={handleRemovePictureClick}
                                       handleAddPictureClick={handleAddPictureClick} disabled={isLoading} />
                    </Grid>
                    <Grid item xs={9} sm={10} style={{outline: '1px dotted lightgray', outlineOffset: '-8px'}}>
                        {tempPicture &&
                            <img src={tempPicture} alt={"error"} style={{
                                margin: 'auto',
                                display: 'block',
                                padding: 'inherit',
                                maxHeight: 129
                            }} />
                        }
                    </Grid>
                    {(isLoading || progress === 100) &&
                        <Grid item xs={12}>
                            <CustomLinearProgress value={progress} />
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
                            Add Category
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default AddCategory;


