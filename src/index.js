import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducer from './store/reducers/auth';
import cartReducer from './store/reducers/cart';
// import confirmationReducer from './store/reducers/singUp';
import {AuthProvider} from './containers/Auth/Auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
});

const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <AuthProvider>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </AuthProvider>
);


ReactDOM.render(app, document.getElementById('root'));
//registerServiceWorker();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
