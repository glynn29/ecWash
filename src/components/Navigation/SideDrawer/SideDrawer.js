import React from 'react';

import Drawer from '@material-ui/core/SwipeableDrawer';
import Typography from "@material-ui/core/Typography";

import EcIcon from "../../../assets/icons/EcIcon/EcIcon";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "../SideDrawer/SideDrawer.module.css";

const SideDrawer = ({toggleDrawer, drawerState}) => (
        <Drawer anchor={'left'} open={drawerState} onClose={toggleDrawer} onOpen={toggleDrawer}
                style={{display: 'flex'}}>
            <Typography variant="h6" className={classes.Center}>
                <EcIcon/>
            </Typography>
            <div className={classes.List} onClick={toggleDrawer}>
                <NavigationItems/>
            </div>
        </Drawer>
);

export default SideDrawer;
