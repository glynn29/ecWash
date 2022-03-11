import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import formStyles from "../../../components/UI/Styles/formStyle";
import { auth } from "../../../firebase";

const Forgot = () => {
    const [email, setEmail] = useState("");
    const [result, setResult] = useState(null);
    const classes = formStyles();

    const submitHandler = (event) => {
        event.preventDefault();
        const actionCodeSettings = {
            //TODO change this url
            url: 'https://carwash-57347.web.app/login',
            handleCodeInApp: false
        };

        auth.sendPasswordResetEmail(email, actionCodeSettings)
            .then(() => setResult("Successfully sent reset email to: " + email))
            .catch(error => setResult("Error sending Email: " + error.message));
    };

    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                {result}
                <form className={classes.form} noValidate onSubmit={submitHandler}>
                    <TextField
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        SUBMIT
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Forgot;
