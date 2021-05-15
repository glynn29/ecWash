import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavagationItems";
import DrawerToggle from "../NavigationItems/SideDrawer/DrawerToggle/DrawerToggle";
import jaydoc from '../../../assets/images/jaydoc2.PNG';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>

        <div className={classes.Logo}>
            <Logo/>
        </div>

        {/*<div className={classes.Header}>*/}
        {/*    <img src={jaydoc}/>*/}
        {/*</div>*/}
        {/*<div className={classes.Header}>*/}
        {/*    <Typography variant="h5">JayDoc Free Clinic <Typography variant="h6">Official Volunteer Website</Typography></Typography>*/}
        {/*</div>*/}
        <nav className={classes.DeskTopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;
