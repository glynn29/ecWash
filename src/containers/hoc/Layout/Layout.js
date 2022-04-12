import React, { Fragment } from "react";
import { withSnackbar } from 'notistack';

import CustomAppBar from "../../../components/Navigation/AppBar/AppBar";
import Footer from "../../../components/UI/Footer/Footer";
import classes from "./Layout.module.css"

const Layout = props => (
    <Fragment>
        <div className={classes.MinHeight}>
            <div>
                <CustomAppBar/>
            </div>
            <main className={classes.MainContent}>
                {props.children}
            </main>
        </div>
        <Footer/>
    </Fragment>
);

export default withSnackbar(Layout);
