import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { SnackbarProvider } from "notistack";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducer from './store/reducers/auth';
import cartReducer from './store/reducers/cart';
import partReducer from './store/reducers/parts';
import categoryReducer from './store/reducers/categories'
import { AuthProvider } from './containers/Auth/Auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    parts: partReducer,
    categories: categoryReducer,
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <AuthProvider>
        <Provider store={store}>
            <BrowserRouter>
                <SnackbarProvider maxSnack={3}>
                    <App/>
                </SnackbarProvider>
            </BrowserRouter>
        </Provider>
    </AuthProvider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
