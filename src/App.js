import React, {useContext, useEffect} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Orders from "./containers/Pages/Orders/Orders";
import Page404 from "./components/UI/404/404";
import Register from "./containers/Auth/Register/Register";
import Login from "./containers/Auth/Login/Login";
import Logout from "./containers/Auth/Logout/Logout";
import Forgot from "./containers/Auth/Forgot/Forgot";
import Layout from "./containers/hoc/Layout/Layout";
import Home from "./containers/Pages/Home/Home";
import Users from "./containers/Pages/Admin/Users/Users";
import Parts from "./containers/Pages/Admin/Parts/Parts";
import Shopping from "./containers/Pages/Client/Shopping/Shopping";
import ItemView from "./containers/Pages/Client/Shopping/Views/ItemView";
import Category from "./containers/Pages/Admin/Categories/Category";
import Kits from "./containers/Pages/Admin/Kits/Kits";
import Checkout from "./containers/Pages/Client/Shopping/Checkout/Checkout";
import {AuthContext} from "./containers/Auth/Auth";
import * as actions from './store/actions/index';

const App = (props) =>{
    const {currentUser, isAdmin} = useContext(AuthContext);

    // useEffect(() => {
    //     if(!isAdmin && currentUser){
    //         getCurrentUser();
    //     }
    // },[isAdmin, getCurrentUser, currentUser]);

    useEffect(() => {
        if (currentUser) {
            props.onFetchParts();
            props.onFetchCategories();
        }
    }, [currentUser]);

    let routes = (
        <Switch>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/forgot" component={Forgot}/>
            <Route path="/" exact component={Home}/>
            <Route render={() => <Page404/>} />
        </Switch>
    );

    if(currentUser) {
        routes = (
            <Switch>
                <Route path="/orders" component={Orders}/>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/kits" component={Kits}/>
                <Route path="/category" component={Category}/>
                <Route path="/items/:item" component={ItemView}/>
                <Route path="/shopping" component={Shopping}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/forgot" component={Forgot}/>
                <Route path="/users" component={Users}/>
                <Route path="/parts" component={Parts}/>
                <Route path="/" exact component={Home}/>
                <Route render={() => <Page404/>} />
            </Switch>
        );
    }
    //
    //     if (props.approved === "false"){
    //         routes = (
    //             <Switch>
    //                 <Route path="/contactUs" component={ContactUs}/>
    //                 <Route path="/comments" component={Comment}/>
    //                 <Route path="/logout" component={Logout}/>
    //                 <Route path="/login" component={Login}/>
    //                 <Route path="/forgot" component={Forgot}/>
    //                 <Route path="/" exact component={Error}/>
    //             </Switch>
    //         );
    //     }
    //
    //     if(isAdmin) {
    //         routes = (
    //             <Switch>
    //                 <Route path="/email" component={Email}/>
    //                 <Route path="/report" component={Report}/>
    //                 <Route path="/calendar" component={Calendar}/>
    //                 <Route path="/eventList" component={EventList}/>
    //                 <Route path="/volunteerList" component={Users}/>
    //                 <Route path="/scheduledEventList" component={ScheduledEventList}/>
    //                 <Route path="/logout" component={Logout}/>
    //                 <Route path="/login" component={Login}/>
    //                 <Route path="/forgot" component={Forgot}/>
    //                 <Route path="/" exact component={Dashboard}/>
    //             </Switch>
    //         );
    //     }
    // }

    return (
        <div>
            <Layout currentUser={currentUser}>
                {routes}
            </Layout>
        </div>
    );
};

const mapStateToProps = state => {
    return{
        approved: state.auth.approved
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onFetchParts: () => dispatch(actions.onFetchParts()),
        onFetchCategories: () => dispatch(actions.onFetchCategories()),
        // onFetchRoleList: () => dispatch(actions.fetchRoleList()),
        // onFetchPositionList: () => dispatch(actions.fetchPositionList()),
        // getCurrentUser: () => dispatch(actions.getUser()),
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
