import React, { useContext, useState } from "react";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import formStyles from "../../../../../../components/UI/Styles/formStyle";
import { AuthContext } from "../../../../../Auth/Auth";

const Add = props => {
    const [first, setFirst] = useState("glynn");
    const [last, setLast] = useState("poop");
    const [email, setEmail] = useState("a@a.com");
    const [password, setPassword] = useState("123456");
    const [city, setCity] = useState("dsfs");
    const [state, setState] = useState("sd");
    const [zip, setZip] = useState("12322");
    const [address, setAddress] = useState("asdf s");
    const [locationPhone, setLocationPhone] = useState("1234567890");
    const [managerPhone, setManagerPhone] = useState("1234567890");
    const [nickName, setNickName] = useState("");
    const [error, setError] = useState({});
    const { isAdmin } = useContext(AuthContext);
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
                state: state.trim()
                    .toUpperCase(),
                zip: zip.trim(),
                address: address.trim(),
                locationPhone: locationPhone.trim(),
                first: trimmedFirst,
                last: trimmedLast,
                managerPhone: managerPhone.trim(),
                nickName: nickName,
                approved: "true"
            };

            props.onAdd(formData, isAdmin);
        }
    };
    return (
        <Container component="main" maxWidth="sm">
            <form className={classes.form} onSubmit={submitHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>Credentials</Typography>
                        <Divider />
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
                            {...(error.email && { error: true, helperText: error.email })}
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
                            {...(error.password && { error: true, helperText: error.password })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Car Wash Location Info</Typography>
                        <Divider />
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
                            {...(error.email && { error: true, helperText: error.email })}
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
                            inputProps={{ maxLength: 63 }}
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
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>General Manager Contact Info</Typography>
                        <Divider />
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
                            {...(error.first && { error: true, helperText: error.first })}
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
                            {...(error.last && { error: true, helperText: error.last })}
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
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={nickName}
                            onChange={event => setNickName(event.target.value)}
                            variant="outlined"
                            required
                            fullWidth
                            id="nickname"
                            label="Nickname"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {props.error}
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={props.handleClose}
                            fullWidth
                            className={classes.cancelButton}
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Add User
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Add;
