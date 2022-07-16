import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducer from './store/reducers/auth';
import cartReducer from './store/reducers/cart';
import partReducer from './store/reducers/parts';
import userReducer from './store/reducers/users';
import categoryReducer from './store/reducers/categories';
import cutSheetReducer from './store/reducers/cutsheets';
import { AuthProvider } from './containers/Auth/Auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    parts: partReducer,
    categories: categoryReducer,
    users: userReducer,
    cutSheets: cutSheetReducer,
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const theme = createTheme({
    typography: {
        fontFamily: "Roboto , sans-serif"
    },
    palette: {
        primary: {
            // main: '#0050A4',
            main: '#036DDF',
            contrastText: '#fff'
        },
        secondary: {
            main: '#D8222B',
            contrastText: '#fff'
        },
        green: {
            main: '#50A65B',
            contrastText: '#fff',
            dark: '#489552',
            light: '#66B669'
        }
    },
});

const app = (
    <AuthProvider>
        <Provider store={store}>
            <BrowserRouter>
                <SnackbarProvider maxSnack={3}>
                    <ThemeProvider theme={theme}>
                        <App/>
                    </ThemeProvider>
                </SnackbarProvider>
            </BrowserRouter>
        </Provider>
    </AuthProvider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
