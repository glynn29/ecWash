import React, { useContext } from "react";
import { connect } from "react-redux";
import { AuthContext } from "../../../containers/Auth/Auth";

import List from '@material-ui/core/List';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CategoryIcon from '@material-ui/icons/Category';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import CropFreeIcon from '@material-ui/icons/CropFree';
import HistoryIcon from '@material-ui/icons/History';
import DescriptionIcon from '@material-ui/icons/Description';
import BuildIcon from '@material-ui/icons/Build';
import Divider from "@material-ui/core/Divider";
import FilterListIcon from '@material-ui/icons/FilterList';

import NavigationItem from "./NavagationItem/NavigationItem";

const NavigationItems = () => {
    const { currentUser, isAdmin } = useContext(AuthContext);

    const nav = currentUser ?
        <NavigationItem link="/logout" text="Logout" icon={<ArrowBackIosIcon />} />
        :
        <NavigationItem link="/login" text="Login" icon={<ArrowForwardIosIcon />} />;

    let links = (
        <List>
            {nav}
            <Divider />
            <NavigationItem link="/" exact text="Home" icon={<HomeIcon />} />
        </List>
    );

    if (currentUser) {
        if (isAdmin) {
            links = (
                <List>
                    {nav}
                    <Divider />
                    <NavigationItem link="/orders" text="Orders" icon={<HistoryIcon />} />
                    <NavigationItem link="/users" text="Users" icon={<PersonIcon />} />
                    <NavigationItem link="/parts" text="Parts" icon={<WorkOutlineIcon />} />
                    <NavigationItem link="/category" text="Categories" icon={<CategoryIcon />} />
                    <NavigationItem link="/filters" text="Filters" icon={<FilterListIcon />} />
                    <Divider />
                    <NavigationItem link="/shopping" text="Shopping" icon={<ShoppingCartIcon />} />
                    <NavigationItem link="/supportdocuments" text="Tech Support Documents" icon={<DescriptionIcon />} />
                    <NavigationItem link="/maintenance" text="Recommended Maintenance" icon={<BuildIcon />} />
                    <Divider />
                    <NavigationItem link="/qr" text="QR Manager" icon={<CropFreeIcon />} />
                    <NavigationItem link="/kits" text="Mass Picture Upload" icon={<BurstModeIcon />} />
                </List>
            )
        } else {
            links = (
                <List>
                    {nav}
                    <Divider />
                    <NavigationItem link="/shopping" text="Shopping" icon={<ShoppingCartIcon />} />
                    <NavigationItem link="/orderhistory" text="Orders History" icon={<HistoryIcon />} />
                    <Divider />
                    <NavigationItem link="/supportdocuments" text="Tech Support Documents" icon={<DescriptionIcon />} />
                    <NavigationItem link="/maintenance" text="Recommended Maintenance" icon={<BuildIcon />} />
                </List>
            );
        }
    }

    return links;
};

const mapStateToProps = state => {
    return {
        approved: state.auth.approved
    };
};

export default connect(mapStateToProps)(NavigationItems);
