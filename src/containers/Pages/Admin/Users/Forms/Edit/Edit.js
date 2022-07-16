import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import formStyles from "../../../../../../components/UI/Styles/formStyle";
import { functions } from "../../../../../../firebase";

const Edit = props => {
    const {formData} = props;
    const [first, setFirst] = useState(formData.first);
    const [last, setLast] = useState(formData.last);
    const [city, setCity] = useState(formData.city);
    const [state, setState] = useState(formData.state);
    const [zip, setZip] = useState(formData.zip);
    const [address, setAddress] = useState(formData.address);
    const [locationPhone, setLocationPhone] = useState(formData.locationPhone);
    const [managerPhone, setManagerPhone] = useState(formData.managerPhone);
    const [nickName, setNickName] = useState(formData.nickName ? formData.nickName : "");
    const [approved, setApproved] = useState(formData.approved === "true");
    const [isLoading, setLoading] = useState(false);
    const classes = formStyles();

    const submitHandler = (event) => {
        event.preventDefault();
        const tempFirst = first.trim()
            .charAt(0)
            .toUpperCase() + first.trim()
            .slice(1);
        const tempLast = last.trim()
            .charAt(0)
            .toUpperCase() + last.trim()
            .slice(1);

        const formData = {
            ...props.formData,
            city,
            state,
            zip,
            address,
            locationPhone,
            first: tempFirst,
            last: tempLast,
            managerPhone,
            nickName,
            approved: `${approved}`
        };

        console.log(formData);
        console.log(props.formData);
        setLoading(true);
        const updateUserApproval = functions.httpsCallable('updateUserApproval');
        updateUserApproval({disabled: !approved, email: props.formData.email})
            .then(() => {
                props.onEdit(formData, props.formData.email);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    // TODO fix scroll of form
    return (
        <Container component="main" maxWidth="sm">
            <form className={classes.form} onSubmit={submitHandler}>
                <Grid container spacing={2}>
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
                            autoFocus
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
                        <FormControlLabel
                            className={classes.formControl}
                            checked={approved}
                            value={approved}
                            onChange={() => setApproved(!approved)}
                            control={<Checkbox value={approved} color="primary"/>}
                            label="Approved"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {props.error}
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            disabled={isLoading}
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
                            disabled={isLoading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Save User
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Edit;
