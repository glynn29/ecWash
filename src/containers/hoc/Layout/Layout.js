import React from "react";

import CustomAppBar from "../../../components/Navigation/AppBar/AppBar";
import Footer from "../../../components/UI/Footer/Footer";
import classes from "./Layout.module.css"

const Layout = props => (
    <div>
        <div className={classes.Box}>
            <div>
                <CustomAppBar/>
            </div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </div>
        <Footer/>
    </div>
);

export default Layout;
