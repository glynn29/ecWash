import React from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import useStyles from "../Styles/formStyle";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const TransitionModal = (props) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="md" style={{textAlign: 'center', padding: 2}}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.modalPaper}>
                        <Grid container direction={"column"} alignItems={"center"} style={{minWidth: '50vw'}}>
                            <Typography component="h1" variant="h5">
                                {props.title}
                            </Typography>
                            {props.title && <Divider style={{width: "100%"}}/>}
                            <br/>
                            {props.form}
                        </Grid>
                    </div>
                </Fade>
            </Modal>
        </Container>
    );
};

export default TransitionModal;
