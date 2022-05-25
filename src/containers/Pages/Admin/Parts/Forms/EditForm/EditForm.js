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
import { getTimestamp, storageRef } from "../../../../../../firebase";
import CustomLinearProgress from "../../../../../../components/UI/LinearProgress/CustomLinearProgress";
import PictureButton from "../../../../../../components/UI/Buttons/PictureButton";
import { compressFile, handleFileUpload } from "../../../../../../components/UI/Helper/Helper";

const EditForm = props => {
    const styles = formStyles();
    const [name, setName] = useState(props.formData.name);
    const [details, setDetails] = useState(props.formData.details ? props.formData.details : "");
    const [categoryId, setCategoryId] = useState(props.formData.categoryId);
    const [tempPictureUrl, setTempPictureUrl] = useState(props.formData.pictures.length > 0 ? props.formData.pictures[0].pictureUrl : null);
    const [isPictureRemoved, setIsPictureRemoved] = useState(false);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    //functions for showing a temporary photo before an actual upload
    const handleAddPictureClick = async (event) => {
        const file = event.target.files[0];
        setIsLoading(true);
        await compressFile(file, true)
            .then(compressedResult => setFile(compressedResult))
            .catch(error => setError(error));
        setIsLoading(false);
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function () {
            setTempPictureUrl(reader.result);
        };
    };

    const handleRemovePictureClick = () => {
        setTempPictureUrl(null);
        setIsPictureRemoved(true);
    };

    const submitFormHandler = async (event) => {
        event.preventDefault();
        let pictures = props.formData.pictures;
        let pictureError = false;
        let pictureName = null;

        if (isPictureRemoved) {
            await props.deletePhotoFromStorage(props.formData.categoryId, props.formData.id, props.formData.pictures[0].pictureName)
                .then(function () {
                    pictures = [];
                })
                .catch(function (error) {
                    console.log(error);
                    setError(error.message);
                    pictureError = true;
                });
        }

        if (file && !pictureError) {
            pictureName = file.name.substring(0, file.name.indexOf('.'));
            const uploadTask = storageRef.child('parts')
                .child(categoryId)
                .child(props.formData.id)
                .child(pictureName)
                .put(file);
            setIsLoading(true);
            await handleFileUpload(uploadTask, setProgress)
                .then(function (pictureUrl) {
                    pictures[0] = { pictureUrl, pictureName };
                })
                .catch(function (error) {
                    console.log(error);
                    setError(error.message);
                    pictureError = true;
                });
            setIsLoading(false);
        }

        const timeStamp = getTimestamp();
        const part = {
            ...props.formData,
            name,
            categoryId,
            details,
            pictures,
            updatedAt: timeStamp
        };

        console.log(part);
        if (!pictureError) {
            props.onEdit(part, props.formData.id);
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
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={styles.formControl} required>
                            <InputLabel required>Part Category</InputLabel>
                            <Select
                                native
                                value={categoryId}
                                onChange={event => setCategoryId(event.target.value)}
                                label="Part Category"
                            >
                                <option aria-label="None" value="" />
                                {props.categories.map(listItem => {
                                    return (
                                        <option key={listItem.name} value={listItem.id}>{listItem.name}</option>
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
                                minRows={2}
                                inputProps={{ className: styles.textarea }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sm={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <PictureButton tempPicture={tempPictureUrl} handleRemovePictureClick={handleRemovePictureClick}
                                       handleAddPictureClick={handleAddPictureClick} disabled={isLoading} />
                    </Grid>
                    <Grid item xs={9} sm={10} style={{ outline: '1px dotted lightgray', outlineOffset: '-8px' }}>
                        {tempPictureUrl &&
                            <img src={tempPictureUrl} alt={"error"} style={{
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
                    <Grid item xs={10} style={{ margin: 'auto' }}>
                        <Button
                            disabled={isLoading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Save Part
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default EditForm;
