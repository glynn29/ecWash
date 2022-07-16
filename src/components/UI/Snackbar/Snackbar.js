import React, { forwardRef, Fragment, useImperativeHandle, useState } from "react";
import { withSnackbar } from 'notistack';

import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const CustomSnackbar = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        }
    }));

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
// .props.enqueueSnackbar('Customise this snackbar youself.', {
//         variant: 'default',
//         action={
//           <Fragment>
//             <IconButton
//               color="inherit"
//               sx={{ p: 0.5 }}
//               onClick={handleClose}
//             >
//               <CloseIcon />
//             </IconButton>
//           <Fragment>
//         }
    return (
        <Snackbar open={open} autoHideDuration={2000} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                  onClose={handleClose} TransitionComponent={Slide} action={handleClose()}>
            <Alert onClose={handleClose} severity="success" variant={"filled"} elevation={6}>
                {props.message}
            </Alert>
        </Snackbar>
    );
});


const EnqueuedSnackBar = props => {
    const [state, setState] = useState(false);

    return props.state ? props.enqueueSnackbar('Sign up successful', {
        variant: "success",
        autoHideDuration: 6000,
        TransitionComponent: Slide,
        onClose: setState(false),
        anchorOrigin: {vertical: 'bottom', horizontal: 'right'}
    }) : <Fragment/>;
};

export default withSnackbar(EnqueuedSnackBar);
