import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";

import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";

import * as classes from './Home.module.css';
import * as actions from "../../../store/actions";

const Home = (props) => {
    useEffect(() => {
        if (props.orderComplete) {
            props.enqueueSnackbar('Order Complete', {
                variant: "success",
                autoHideDuration: 9000,
                TransitionComponent: Slide,
                anchorOrigin: {vertical: 'bottom', horizontal: 'right'}
            });
            props.clearOrder();
        }
    }, [props.orderComplete]);

    return (
        <div className={classes.Box}>
            <Typography variant="h2" className={classes.Line}><b>EC Wash </b></Typography>
            <Typography variant="h4" className={classes.Line}><b>Landing Page info here</b></Typography>
            <br/>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        orderComplete: state.cart.orderComplete
    };
};

const mapDispatchToProps = dispatch => {
    return {
        clearOrder: () => dispatch(actions.clearOrder()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Home));
