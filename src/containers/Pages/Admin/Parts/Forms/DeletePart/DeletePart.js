import React from "react";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import useStyles from "../../../../../../components/UI/Styles/formStyle";

const DeletePart = props => {
    const classes = useStyles();
    const formData = props.formData;

    const handleDelete = () => {
        props.onDelete(formData.id);
        console.log("part removed");
    };

    return(
        <Container component="main" maxWidth="sm" style={{textAlign: 'center'}}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography>Delete this part?</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="outlined"
                        className={classes.cancelButton}
                        onClick={props.cancel}
                        fullWidth
                    >Cancel</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        className={classes.detailsButton}
                        onClick={handleDelete}
                        fullWidth
                    >Delete Part</Button>
                </Grid>
            </Grid>
        </Container>
    )
};

export default DeletePart;
