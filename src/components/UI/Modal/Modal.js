import React from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Typography from "@material-ui/core/Typography";

import useStyles from "../Styles/formStyle";

const TransitionModal = (props) => {
    const classes = useStyles();

    return (
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
            style={props.alignTop ? {alignItems: 'start'} : {alignItems: 'center'}}
        >
            <Fade in={props.open}>
                <div className={classes.modalPaper}>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '98%', margin: 'auto'}}>
                        <div style={{width: '35px'}}></div>
                        <Typography component="h1" variant="h5">
                            {props.title}
                        </Typography>
                        <HighlightOffIcon onClick={props.handleClose} color={"error"} fontSize={"large"}
                                          style={{marginTop: '-10px', cursor: 'pointer'}}/>
                    </div>
                    <div style={{maxHeight: '80vh'}}>
                        {props.title && <Divider style={{width: "100%"}}/>}
                        <br/>
                        {props.form}
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default TransitionModal;
