import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Link from "@material-ui/core/Link";

import formStyles from "../../../components/UI/Styles/formStyle";
import { auth, passwordResetUrl } from "../../../firebase";

const Forgot = () => {
    const [email, setEmail] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const classes = formStyles();

    const submitHandler = (event) => {
        event.preventDefault();

        const validEmail = /\S+@\S+\.\S+/;
        let isValid = true;
        if (!email.match(validEmail)) {
            setEmailError("Poorly formatted email");
            isValid = false;
        }

        if (isValid) {
            setEmailError("");
            const actionCodeSettings = {
                url: passwordResetUrl,
                handleCodeInApp: false
            };

            auth.sendPasswordResetEmail(email, actionCodeSettings)
                .then(() => setResult("Successfully sent reset email to: " + email + ". If you dont see it within a minute, check your junk folder."))
                .catch(error => setError("Error sending Email: " + error.message));
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <br />
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
                                    {...(emailError && { error: true, helperText: emailError })}
                                    autoFocus
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography color={"error"}>
                                {error}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                {result}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Reset Password
                            </Button>
                        </Grid>
                        <Grid item xs>
                            <Link href="/login" variant="body2">
                                Login
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

export default Forgot;
