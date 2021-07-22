import React, {useContext} from "react";
import {connect} from "react-redux";
import {AuthContext} from "../../../containers/Auth/Auth";

import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CategoryIcon from '@material-ui/icons/Category';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ListAltIcon from '@material-ui/icons/ListAlt';

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavagationItem/NavigationItem";


const NavigationItems = (props) => {
    const {currentUser, isAdmin} = useContext(AuthContext);
    const {approved} = props;

    const nav = currentUser ?
        <NavigationItem link="/logout" text="Logout" icon={<ArrowBackIosIcon/>}/>
        :
        <NavigationItem link="/login" text="Login" icon={<ArrowForwardIosIcon/>}/>;

    // const adminLinks = (<ul className={classes.NavigationItems}>
    //     <NavigationItem link="/" exact clicked={props.clicked}><Typography>Dashboard</Typography></NavigationItem>
    //     <NavigationItem link="/volunteerList" clicked={props.clicked}><Typography>Volunteers</Typography></NavigationItem>
    //     <NavigationItem link="/eventList" clicked={props.clicked}><Typography>Events</Typography></NavigationItem>
    //     <NavigationItem link="/scheduledEventList" clicked={props.clicked}><Typography>Schedule Events</Typography></NavigationItem>
    //     <NavigationItem link="/calendar" clicked={props.clicked}><Typography>Calendar</Typography></NavigationItem>
    //     <NavigationItem link="/email" clicked={props.clicked}><Typography>Email</Typography></NavigationItem>
    //     <NavigationItem link="/report" clicked={props.clicked}><Typography>Report</Typography></NavigationItem>
    //     {nav}
    // </ul>);
    //
    // const userLinks = (<ul className={classes.NavigationItems}>
    //     <NavigationItem link="/" exact clicked={props.clicked}><Typography>Home</Typography></NavigationItem>
    //     {currentUser && <NavigationItem link="/comments" clicked={props.clicked}><Typography>Mandatory Reporting</Typography></NavigationItem>}
    //     {currentUser && <NavigationItem link="/contactUs" clicked={props.clicked}><Typography>Contact</Typography></NavigationItem>}
    //     {(currentUser && approved === "true") && <NavigationItem link="/account" clicked={props.clicked}><Typography>Account</Typography></NavigationItem>}
    //     {(currentUser && approved === "true") && <NavigationItem link="/calendar" clicked={props.clicked}><Typography>Calendar</Typography></NavigationItem>}
    //     {nav}
    // </ul>);

    // return isAdmin ? adminLinks : userLinks;
    const links = (
        <List>
            {nav}
            <NavigationItem link="/" exact text="Home" icon={<HomeIcon/>}/>
            {currentUser && <NavigationItem link="/users" text="Users" icon={<PersonIcon/>}/>}
            {currentUser && <NavigationItem link="/parts" text="Parts" icon={<WorkOutlineIcon/>}/>}
            {currentUser && <NavigationItem link="/category" text="Category" icon={<CategoryIcon/>}/>}
            {currentUser && <NavigationItem link="/shopping" text="Shopping" icon={<ShoppingCartIcon/>}/>}
            {currentUser && <NavigationItem link="/kits" text="Kits" icon={<AccessAlarmIcon/>}/>}
            {currentUser && <NavigationItem link="/orders" text="Order History" icon={<ListAltIcon/>}/>}

        </List>
    );

    return links;
};

const mapStateToProps = state => {
    return {
        approved: state.auth.approved
    };
};

export default connect(mapStateToProps)(NavigationItems);
