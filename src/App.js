import React, {useContext, useEffect} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Login from "./containers/Auth/Login/Login";
import Register from "./containers/Auth/Register/Register";
import Forgot from "./containers/Auth/Forgot/Forgot";
import Home from "./containers/Pages/Home/Home";
import Layout from "./containers/hoc/Layout/Layout";
import {AuthContext} from "./containers/Auth/Auth";
import * as actions from './store/actions/index';

const App = (props) =>{
    const {currentUser, isAdmin} = useContext(AuthContext);

    // useEffect(() => {
    //     if(!isAdmin && currentUser){
    //         getCurrentUser();
    //     }
    // },[isAdmin, getCurrentUser, currentUser]);

    let routes = (
        <Switch>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/forgot" component={Forgot}/>
            <Route path="/" exact component={Home}/>
        </Switch>
    );

    // if(currentUser){
    //     routes = (
    //         <Switch>
    //             <Route path="/account" component={Account}/>
    //             <Route path="/calendar" component={Calendar}/>
    //             <Route path="/contactUs" component={ContactUs}/>
    //             <Route path="/comments" component={Comment}/>
    //             <Route path="/logout" component={Logout}/>
    //             <Route path="/login" component={Login}/>
    //             <Route path="/forgot" component={Forgot}/>
    //             <Route path="/confirm" component={Confirmation}/>
    //             <Route path="/" exact component={Home}/>
    //         </Switch>
    //     );
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

// const mapDispatchToProps = dispatch => {
//     return{
//         onFetchRoleList: () => dispatch(actions.fetchRoleList()),
//         onFetchPositionList: () => dispatch(actions.fetchPositionList()),
//         getCurrentUser: () => dispatch(actions.getUser()),
//     }
// };

export default withRouter(connect(mapStateToProps,null)(App));
