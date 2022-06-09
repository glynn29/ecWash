import React, { useContext, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import Filters from "./containers/Pages/Admin/Filters/Filters";
import ManagerResources from "./containers/Pages/Client/ManagerResources/ManagerResources";
import SheetsView from "./containers/Pages/Client/CutSheets/SheetsView";
import CutSheets from "./containers/Pages/Client/CutSheets/CutSheets";
import Orders from "./containers/Pages/Admin/Orders/Orders";
import OrderHistory from "./containers/Pages/Client/OrderHistory/OrderHistory";
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
import QrCode from "./containers/Pages/Admin/QrCode/QrCode";
import Checkout from "./containers/Pages/Client/Shopping/Checkout/Checkout";
import { AuthContext } from "./containers/Auth/Auth";
import * as actions from './store/actions/index';

const App = (props) => {
    const { currentUser, isAdmin } = useContext(AuthContext);
    const { getCurrentUser, onFetchParts, onFetchCategories, onFetchUsers } = props;

    useEffect(() => {
        if (currentUser) {
            if (isAdmin) {
                onFetchUsers();
            } else {
                getCurrentUser();
            }
        }
    }, [isAdmin, getCurrentUser, currentUser, onFetchUsers]);

    useEffect(() => {
        if (currentUser) {
            onFetchParts();
            onFetchCategories();
        }
    }, [currentUser]);

    let routes = (
        <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/forgot" component={Forgot} />
            <Route path="/" exact component={Home} />
            <Route render={() => <Page404 />} />
        </Switch>
    );

    if (currentUser) {
        if (isAdmin) {
            routes = (
                <Switch>
                    <Route path="/filters" component={Filters} />
                    <Route path="/maintenance" component={ManagerResources} />
                    <Route path="/supportdocuments/categories/:category" component={SheetsView} />
                    <Route path="/supportdocuments" component={CutSheets} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/kits" component={Kits} />
                    <Route path="/category" component={Category} />
                    <Route path="/qr" component={QrCode} />
                    <Route path="/shopping/categories/:category" component={ItemView} />
                    <Route path="/shopping" component={Shopping} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/forgot" component={Forgot} />
                    <Route path="/users" component={Users} />
                    <Route path="/parts" component={Parts} />
                    <Route path="/" exact component={Home} />
                    <Route render={() => <Page404 />} />
                </Switch>
            );
        } else {
            routes = (
                <Switch>
                    <Route path="/maintenance" component={ManagerResources} />
                    <Route path="/supportdocuments/categories/:category" component={SheetsView} />
                    <Route path="/supportdocuments" component={CutSheets} />
                    <Route path="/orderhistory" component={OrderHistory} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/shopping/categories/:category" component={ItemView} />
                    <Route path="/shopping" component={Shopping} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/forgot" component={Forgot} />
                    <Route path="/" exact component={Home} />
                    <Route render={() => <Page404 />} />
                </Switch>
            );
        }
    }

    return (
        <Layout currentUser={currentUser}>
            <SnackbarProvider maxSnack={3}>
                {routes}
            </SnackbarProvider>
        </Layout>
    );
};

const mapStateToProps = state => {
    return {
        approved: state.auth.approved,
        added: state.cart.added,
        removed: state.cart.removed
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchParts: () => dispatch(actions.onFetchParts()),
        onFetchCategories: () => dispatch(actions.onFetchCategories()),
        onFetchUsers: () => dispatch(actions.onFetchUsers()),
        getCurrentUser: () => dispatch(actions.getUser()),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
