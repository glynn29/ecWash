import React from "react";
import classes from "./EcIcon.module.css";
import ec_logo from "../../images/ec_logo.png";

const EcIcon = () => (
    <img className={classes.Frame} src={ec_logo} alt={"ec logo"}/>
);

export default EcIcon;
