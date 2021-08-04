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

const EditForm = props => {
    const styles = formStyles();
    const [name, setName] = useState(props.formData.name);
    const [code, setCode] = useState(props.formData.code);
    const [details, setDetails] = useState(props.formData.details);
    const [category, setCategory] = useState(props.formData.category);

    const submitFormHandler = (event) =>{
        event.preventDefault();
        const part = {
            name,
            code,
            details: details,
            category,
            amount: 1
        };
        props.onEdit(part, props.formData.id);
        console.log("part EDITED");
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
                                onChange={event => setCategory(event.target.value) }
                                label="Status"
                            >
                                <option aria-label="None" value="" />
                                {props.statusList.map( listItem => {
                                    return (
                                        <option key={listItem} value={listItem}>{listItem}</option>
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
                                inputProps={{ className: styles.textarea }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={10} style={{margin: 'auto'}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Edit Part
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default EditForm;
