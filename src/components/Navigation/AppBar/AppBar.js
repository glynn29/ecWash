import React, { Fragment, useContext, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { AuthContext } from "../../../containers/Auth/Auth";
import TransitionModal from "../../UI/Modal/Modal";
import Cart from "../../Cart/Cart";
import classes from './AppBar.module.css';
import EcIcon from "../../../assets/icons/EcIcon/EcIcon"
import SearchBar from "../../UI/Search/SearchBar/SearchBar";
import SideDrawer from "../SideDrawer/SideDrawer";
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";
import formStyles from "../../../components/UI/Styles/formStyle";

export default function CustomAppBar() {
    const {currentUser} = useContext(AuthContext);
    const styles = formStyles();
    const [drawerState, setDrawerState] = useState(false);
    const [modalState, setModalState] = useState(false);

    const toggleDrawer = () => {
        setDrawerState(!drawerState);
    };

    const toggleModal = () => {
        setModalState(!modalState);
    };

    return (
        <Fragment>
            <AppBar position="static" className={classes.Color}>
                <Toolbar className={classes.BarCenter}>
                    <IconButton className={styles.menuButton} edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon fontSize={"large"} />
                    </IconButton>
                    <div className={classes.Pic}>
                        <EcIcon/>
                    </div>
                    {currentUser && <div className={classes.Search}>
                        <SearchBar/>
                    </div>}
                    {currentUser && <div className={classes.Button}>
                        <HeaderCartButton open={toggleModal}/>
                    </div>}
                </Toolbar>
            </AppBar>
            <SideDrawer toggleDrawer={toggleDrawer} drawerState={drawerState}/>
            <TransitionModal
                open={modalState}
                handleClose={toggleModal}
                form={<Cart close={toggleModal}/>}
                title={"Cart"}
            />
        </Fragment>
    );
}
