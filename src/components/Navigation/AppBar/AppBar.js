import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import SideDrawer from "../SideDrawer/SideDrawer";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import TransitionModal from "../../UI/Modal/Modal";
import Cart from "../../Cart/Cart";
import ec_logo from '../../../assets/images/ec_logo.png';
import classes from './AppBar.module.css';

import HeaderCartButton from "../../UI/Buttons/HeaderCartButton/HeaderCartButton";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    frame: {
        height: 4
    }
}));

export default function CustomAppBar() {
    const styles = useStyles();
    const [drawerState, setDrawerState] = useState(false);
    const [modalState, setModalState] = useState(false);

    const toggleDrawer = () => {
        setDrawerState(!drawerState);
    };

    const toggleModal = () => {
        setModalState(!modalState);
    };


    return (
        <div className={styles.root}>
            <AppBar position="static" className={classes.Color}>
                <Toolbar>
                    <IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon onClick={toggleDrawer}/>
                    </IconButton>
                    <Typography variant="h6" className={styles.title}>
                        <img className={classes.Frame} src={ec_logo}/>
                    </Typography>
                    <HeaderCartButton open={toggleModal}/>
                </Toolbar>
            </AppBar>
            <SideDrawer toggleDrawer={toggleDrawer} state={drawerState}/>
            <TransitionModal
                open={modalState}
                handleOpen={toggleModal}
                handleClose={toggleModal}
                form={<Cart close={toggleModal}/>}
                title={"Shopping"}
            />
        </div>
    );
}
