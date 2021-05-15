import React, {useState, useContext, useEffect} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import formStyles from "../../../components/UI/Styles/formStyle";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actions from '../../../store/actions/index'
import {AuthContext} from "../../../containers/Auth/Auth";
import FormControl from "@material-ui/core/FormControl";

const Login = (props) => {
    const {currentUser} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const classes = formStyles();

    useEffect(() => {
        if (localStorage.getItem('rememberMe')){
            setRememberMe(true);
            setEmail(localStorage.getItem("email"));
            setPassword(localStorage.getItem("password"));
        }
    },[]);

    const onChangeHandler = () =>{
        if(!rememberMe){
            localStorage.setItem("rememberMe", true);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
        }else {
            localStorage.clear();
        }
        setRememberMe(!rememberMe);
    };

    const submitHandler = (event) =>{
        event.preventDefault();
        props.onLogin(email, password);
    };

    if (currentUser){
        return <Redirect to={"/"}/>;
    }

    if (props.loading){
        return <Spinner/>;
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <br/>
                <form onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoFocus
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox
                                    value={rememberMe}
                                    checked={rememberMe}
                                    onChange={onChangeHandler}
                                    color="primary" />}
                                label="Remember me"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {props.error}
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs>
                            <Link href="/forgot" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                Don't have an account? Register
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        onLogin: (email, password) => dispatch(actions.login(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
