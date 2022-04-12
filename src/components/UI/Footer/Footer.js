import React from "react";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import * as classes from './Footer.module.css'

function Copyright() {
    return (
        <Typography className={classes.Footer} variant="body2" color="textSecondary" align="center">
            Software
            {' © '}
            {new Date().getFullYear() + ' '}
            <Link color="inherit" href="">
                Tanner Post
            </Link>
            {' and '}
            <Link color="inherit" href="">
                Glynn Leininger
            </Link>
        </Typography>
    );
}

export default function Footer() {
    return <Copyright/>;
}
