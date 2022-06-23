import React from "react";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import useStyles from "../../Styles/formStyle";

const DeleteForm = props => {
    const classes = useStyles();

    const handleDelete = () => {
        props.onDelete(props.formData.id);
    };

    return (
        <Container component="main" maxWidth="sm" style={{ textAlign: 'center' }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography>{props.title}</Typography>
                </Grid>
                <Grid item xs={10} style={{ margin: 'auto' }}>
                    <Button
                        disabled={props.loading}
                        variant="contained"
                        className={classes.detailsButton}
                        onClick={handleDelete}
                        fullWidth
                    >{props.buttonText}</Button>
                </Grid>
            </Grid>
        </Container>
    )
};

export default DeleteForm;
