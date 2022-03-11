import React, { useState } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

import Spinner from "../../../components/UI/Spinner/Spinner";
import formStyles from "../../../components/UI/Styles/formStyle";
import * as actions from "../../../store/actions";

const Register = (props) => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [address, setAddress] = useState("");
    const [locationPhone, setLocationPhone] = useState("");
    const [managerPhone, setManagerPhone] = useState("");
    const [error, setError] = useState({});
    const classes = formStyles();

    const formValidator = () => {
        let tempErrors = {};
        let isValid = true;
        const letters = /^[A-Za-z\s]+$/;
        const validEmail = /\S+@\S+\.\S+/;

        if (!first.match(letters)) {
            tempErrors.first = "Name must only contain letters";
            isValid = false
        }

        if (first.trim() === "") {
            tempErrors.first = "Name must not be empty";
            isValid = false
        }

        if (!last.match(letters)) {
            tempErrors.last = "Name must only contain letters";
            isValid = false
        }

        if (last.trim() === "") {
            tempErrors.last = "Name must not be empty";
            isValid = false
        }

        if (!email.match(validEmail)) {
            tempErrors.email = "Poorly formatted email";
            isValid = false;
        }

        if (password !== passwordConfirm) {
            tempErrors.password = "Passwords do not match";
            isValid = false;
        }

        if (password.length < 6) {
            tempErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setError({...tempErrors});
        return isValid;
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formValidator()) {
            const trimmedFirst = first.trim()
                .charAt(0)
                .toUpperCase() + first.trim()
                .slice(1);
            const trimmedLast = last.trim()
                .charAt(0)
                .toUpperCase() + last.trim()
                .slice(1);

            const formData = {
                email: email.trim(),
                password: password,
                city: city.trim(),
                state: state.trim(),
                zip: zip.trim(),
                address: address.trim(),
                locationPhone: locationPhone.trim(),
                first: trimmedFirst,
                last: trimmedLast,
                managerPhone: managerPhone.trim(),
            };

            props.onRegister(formData);
        }
    };

    if (props.isRegistered) {
        return <Redirect to={"/login"}/>
    }

    const form = (
        <Container component="main" maxWidth="sm">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <br/>
                <form className={classes.form} onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Credentials</Typography>
                            <Divider/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoFocus
                                {...(error.email && {error: true, helperText: error.email})}
                                inputProps={{maxLength: 63}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                {...(error.password && {error: true, helperText: error.password})}
                                inputProps={{maxLength: 63}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={passwordConfirm}
                                onChange={event => setPasswordConfirm(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                label="Password Confirm"
                                type="password"
                                id="passwordConfirm"
                                {...(error.password && {error: true, helperText: error.password})}
                                inputProps={{maxLength: 63}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Car Wash Location Info</Typography>
                            <Divider/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={city}
                                onChange={event => setCity(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="city"
                                label="City"
                                {...(error.email && {error: true, helperText: error.email})}
                                inputProps={{maxLength: 63}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                value={state}
                                onChange={event => setState(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="state"
                                label="State"
                                inputProps={{maxLength: 2}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                value={zip}
                                onChange={event => setZip(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="zip"
                                label="Zip Code"
                                inputProps={{maxLength: 5}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={address}
                                onChange={event => setAddress(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="address"
                                label="Address"
                                inputProps={{maxLength: 63}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={locationPhone}
                                onChange={event => setLocationPhone(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                inputProps={{maxLength: 10}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>General Manager Contact Info</Typography>
                            <Divider/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={first}
                                onChange={event => setFirst(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                {...(error.first && {error: true, helperText: error.first})}
                                inputProps={{maxLength: 63}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={last}
                                onChange={event => setLast(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                {...(error.last && {error: true, helperText: error.last})}
                                inputProps={{maxLength: 63}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={managerPhone}
                                onChange={event => setManagerPhone(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="mobile"
                                label="Phone Number"
                                inputProps={{maxLength: 10}}
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
                                Sign Up
                            </Button>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <br/>
            <br/>
        </Container>
    );

    return props.loading ? <Spinner/> : form;
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isRegistered: state.auth.registered,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (registerData) => dispatch(actions.register(registerData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
