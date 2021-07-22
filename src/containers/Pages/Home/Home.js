import React from "react";

import Typography from "@material-ui/core/Typography";

import * as classes from './Home.module.css';

const Home = () => (
    <div className={classes.Box}>
        <Typography variant="h2" className={classes.Line}><b>EC Wash </b></Typography>
        <Typography variant="h4" className={classes.Line}><b>Landing Page info here</b></Typography>
        <br/>
    </div>
);

export default Home;

