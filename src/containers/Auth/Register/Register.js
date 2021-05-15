import React, {useState} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Spinner from "../../../components/UI/Spinner/Spinner";
import formStyles from "../../../components/UI/Styles/formStyle";
import * as actions from "../../../store/actions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Register = (props) => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [role, setRole] = useState("");
    const [otherRole, setOtherRole] = useState("");
    const [positions, setPositions] = useState([]);
    const [secondLanguage, setSecondLanguage] = useState(false);
    const [language, setLanguage] = useState("");
    const [error, setError] = useState({});
    const list = props.roleList;
    const classes = formStyles();


    const formValidator = () => {
        let tempErrors = {};
        let isValid = true;
        const letters = /^[A-Za-z\s]+$/;
        const validEmail = /\S+@\S+\.\S+/;

        if(!first.match(letters)){
            tempErrors.first = "Name must only contain letters";
            isValid = false
        }

        if(first.trim() === ""){
            tempErrors.first = "Name must not be empty";
            isValid = false
        }

        if(!last.match(letters)){
            tempErrors.last = "Name must only contain letters";
            isValid = false
        }

        if(last.trim() === ""){
            tempErrors.last = "Name must not be empty";
            isValid = false
        }

        if(!email.match(validEmail)){
            tempErrors.email = "Poorly formatted email";
            isValid = false;
        }

        if(password !== passwordConfirm){
            tempErrors.password = "Passwords do not match";
            isValid = false;
        }

        if(password.length < 6){
            tempErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        if(role === "Other" && !otherRole.match(letters)){
            tempErrors.role = "Role must only contain letters";
            isValid = false
        }

        if(role === "Other" &&  otherRole.trim() === ""){
            tempErrors.role = "Role must not be empty";
            isValid = false
        }

        if(secondLanguage && !language.match(letters)){
            tempErrors.language = "Language must only contain letters";
            isValid = false
        }

        if(secondLanguage && language.trim() === ""){
            tempErrors.language = "Language must not be empty";
            isValid = false
        }

        setError({...tempErrors});
        return isValid;
    };

    const submitHandler = (event) =>{
        event.preventDefault();
        if(formValidator()) {
            const tempFirst = first.trim().charAt(0).toUpperCase() + first.trim().slice(1);
            const tempLast = last.trim().charAt(0).toUpperCase() + last.trim().slice(1);
            const tempLanguage = secondLanguage ? language.trim().charAt(0).toUpperCase() + language.trim().slice(1) : language;
            const tempRole = (role === "Other") ? otherRole.trim().charAt(0).toUpperCase() + otherRole.trim().slice(1) : role;
            const tempPositions = (role === "Other") ? props.positionList: positions;

            console.log(tempFirst, tempLast, tempLanguage, tempRole);

            const formData = {
                first: tempFirst,
                last: tempLast,
                email: email,
                password: password,
                role: tempRole,
                language: tempLanguage,
                positions: tempPositions,
            };

            props.onRegister(formData);
        }
    };

    const onSelectHandler = (event) => {
        setRole(event.target.value);
        list.filter(e => e.name === event.target.value).map(row => setPositions(row.positions));
    };

    if(props.isRegistered){
         return <Redirect to={"/login"}/>
    }

    const form = (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <br/>
                <form className={classes.form} onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={first}
                                onChange={event => setFirst(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                {...(error.first && {error: true, helperText: error.first})}
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                {...(error.email && {error: true, helperText: error.email})}
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl} required>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    MenuProps={MenuProps}
                                    value={role}
                                    onChange={onSelectHandler}
                                    label="Role"
                                >
                                    <MenuItem aria-label="None" value="" />
                                    {list.map( listItem => {
                                        return (
                                            <MenuItem key={listItem.name} value={listItem.name}>{listItem.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        {role === "Other" &&
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl} >
                                <TextField
                                    value={otherRole}
                                    onChange={event => setOtherRole(event.target.value)}
                                    label="Enter Role"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="role"
                                    {...(error.role && {error: true, helperText: error.role})}
                                />
                            </FormControl>
                        </Grid>}
                        <Grid item xs={12}>
                            <FormControlLabel
                                style={{alignItems: 'center',}}
                                value={secondLanguage}
                                onChange={event => setSecondLanguage(!secondLanguage)}
                                control={<Checkbox color="primary" />}
                                label="Second Language?"
                            />
                        </Grid>
                        {secondLanguage &&
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl} >
                                <TextField
                                    value={language}
                                    onChange={event => setLanguage(event.target.value)}
                                    label="Enter Language"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="language"
                                    {...(error.language && {error: true, helperText: error.language})}
                                />
                            </FormControl>
                        </Grid>}
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
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );

    return props.loading ? <Spinner/> : form;
};

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isRegistered: state.auth.registered,
        roleList: state.lists.roleList,
        positionList: state.lists.positionList,
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        onRegister: (registerData) => dispatch(actions.register(registerData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
