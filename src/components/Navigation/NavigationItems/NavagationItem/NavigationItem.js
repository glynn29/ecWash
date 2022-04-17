import React from "react";
import { NavLink } from "react-router-dom";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

import classes from "./NavigationItem.module.css";

const navigationItem = (props) => (

    <ListItem className={classes.NavigationItem}>
        <NavLink
            activeClassName={classes.active}
            to={props.link}
            exact
        >
            <ListItemIcon>{props.icon}</ListItemIcon>
            <ListItemText primary={props.text}/>
        </NavLink>
    </ListItem>
);

export default navigationItem;
