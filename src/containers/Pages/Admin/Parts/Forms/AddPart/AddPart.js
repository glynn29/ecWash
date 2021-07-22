import React, {useState} from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import formStyles from "../../../../../../components/UI/Styles/formStyle";

const AddPart = props => {
    const styles = formStyles();
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [details, setDetails] = useState("");
    const [category, setCategory] = useState("");
    const [picture, setPicture] = useState(null);

    const handleUploadClick = event => {
        console.log();
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function(e) {
            setPicture(reader.result);
        };
    };

    const handleRemoveClick = () => {
        setPicture(null);
    };

    const submitFormHandler = (event) =>{
        event.preventDefault();
        const part = {
            name,
            code,
            details,
            category,
            picture,
            amount: 1
        };
        props.onAdd(part);
        console.log("part ADDED");
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
                    <Grid item xs={3} sm={2}>
                        {imageButton}
                    </Grid>
                    <Grid item xs={9} sm={10}>
                        <FormControl variant="outlined" className={styles.formControl} required>
                            <InputLabel required>Part Category</InputLabel>
                            <Select
                                native
                                value={category}
                                onChange={event => setCategory(event.target.value) }
                                label="Part Category"
                            >
                                <option aria-label="None" value="" />
                                {props.categories.map( listItem => {
                                    return (
                                        <option key={listItem.name} value={listItem.name}>{listItem.name}</option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" className={styles.formControl}>
                            <TextField
                                value={details}
                                onChange={event => setDetails(event.target.value)}
                                id="description"
                                label="Part Description"
                                multiline
                                variant="outlined"
                                fullWidth
                                rows={4}
                                inputProps={{ className: styles.textarea }}
                            />
                        </FormControl>
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
                            Add Part
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default AddPart;
