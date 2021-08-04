import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import formStyles from "../../../../../../components/UI/Styles/formStyle";
import {firestore} from "../../../../../../firebase";

const EditCategory = props => {
    const styles = formStyles();
    const [name, setName] = useState(props.formData.name);
    const [picture, setPicture] = useState(props.formData.picture);
    const categoryList = [{name: 'Bearing'}, {name: 'Vacuum'}];

    const handleUploadClick = event => {
        console.log();
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function(e) {
            setPicture(reader.result);
        };
        console.log(url); // Would see a path?
    };

    const handleRemoveClick = () => {
        setPicture(null);
    };

    const submitFormHandler = (event) =>{
        event.preventDefault();
        firestore.collection('categories').doc(props.formData.id).update({
            name,
            picture,
        }).then(()=>{props.onEdit();})
            .catch(error => {console.log(error)});
        console.log("category EDITED");
    };

    const imageButton = (picture ?
            <Fab component="span">
                <HighlightOffIcon onClick={handleRemoveClick} color={"error"} fontSize={"large"}/>
            </Fab>
            :
            <div>
                <input
                    accept="image/*"
                    className={styles.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleUploadClick}
                />
                <label htmlFor="contained-button-file">
                    <Fab component="span">
                        <AddPhotoAlternateIcon />
                    </Fab>
                </label>
            </div>
    );

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
                    <Grid item xs={3} sm={2}>
                        {imageButton}
                    </Grid>
                    <Grid item xs={12} sm={6} style={{outline: '1px dotted lightgray', outlineOffset: '-8px'}}>
                        {picture &&
                        <img src={picture} alt={"error"} style={{
                            margin: 'auto',
                            display: 'block',
                            padding: 'inherit',
                            maxHeight: 129
                        }}/>
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={props.handleClose}
                            fullWidth
                            className={styles.cancelButton}
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Edit Category
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

// const mapStateToProps = state => {
//     return{
//
//     };
// };

export default EditCategory;
