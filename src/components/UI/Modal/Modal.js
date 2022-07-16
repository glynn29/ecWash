import React from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Typography from "@material-ui/core/Typography";

import useStyles from "../Styles/formStyle";
import * as classes from "../../../containers/Pages/Client/Shopping/Checkout/Checkout.module.css";
import { Bubble } from "../../../containers/Pages/Client/Shopping/Checkout/Bubble";

const TransitionModal = (props) => {
    const styles = useStyles();

    return (
        <Modal
            className={styles.modal}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            style={props.alignTop ? { alignItems: 'start' } : { alignItems: 'center' }}
        >
            <Fade in={props.open}>
                <div className={styles.modalPaper}>
                    <HighlightOffIcon onClick={props.handleClose} color={"error"} fontSize={"large"} className={styles.modalExitButton} />
                    <div>
                        <Typography component={"h1"} variant={"h5"} className={classes.Title}>
                            <Bubble left={2} />
                            <Bubble left={90} top={33} />
                            {props.title}
                        </Typography>
                    </div>
                    <div className={styles.modalFormWrapper}>
                        {props.title && <Divider style={{ width: "100%" }} />}
                        <br />
                        {props.form}
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default TransitionModal;
