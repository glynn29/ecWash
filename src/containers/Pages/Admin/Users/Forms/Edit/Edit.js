import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {bool} from "prop-types";
import React, {useState} from "react";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import formStyles from "../../../../../../components/UI/Styles/formStyle";

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

const Edit = props => {
    const {formData} = props;
    const [first, setFirst] = useState(formData.first);
    const [last, setLast] = useState(formData.last);
    const [city, setCity] = useState(formData.city);
    const [state, setState] = useState(formData.state);
    const [zip, setZip] = useState(formData.zip);
    const [locationPhone, setLocationPhone] = useState(formData.locationPhone);
    const [managerPhone, setManagerPhone] = useState(formData.managerPhone);
    const [washType, setWashType] = useState(formData.washType);
    const [otherWashType, setOtherWashType] = useState("");
    const [error, setError] = useState({});
    const washTypeList = [{name: 'Tommy\'s'}, {name: 'Zips'}, {name: 'Other'}];
    const [approved, setApproved] = useState(formData.approved === 'true');
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
            city: city,
            state: state,
            zip: zip,
            locationPhone: locationPhone,
            washType: washType,
            first: tempFirst,
            last: tempLast,
            managerPhone: managerPhone,
            approved: approved
        };

        props.onEdit(formData);

    };
    return (
        <Container component="main" maxWidth="sm">
            <form className={classes.form} onSubmit={submitHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>Location ID</Typography>
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
                            {...(error.email && {error: true, helperText: error.email})}
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
                        <FormControl variant="outlined" className={classes.formControl} required>
                            <InputLabel>Wash Type</InputLabel>
                            <Select
                                MenuProps={MenuProps}
                                value={washType}
                                onChange={event => setWashType(event.target.value)}
                                label="Wash Type"
                            >
                                {washTypeList.map(listItem => {
                                    return (
                                        <MenuItem key={listItem.name}
                                                  value={listItem.name}>{listItem.name}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    {washType === "Other" &&
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                value={otherWashType}
                                onChange={event => setOtherWashType(event.target.value)}
                                label="Wash Type"
                                variant="outlined"
                                required
                                fullWidth
                                id="otherWashType"
                                {...(error.role && {error: true, helperText: error.role})}
                            />
                        </FormControl>
                    </Grid>}
                    <Grid item xs={12}>
                        <Typography>General Manager Contact</Typography>
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
                        <FormControlLabel
                            className={classes.formControl}
                            checked={approved}
                            value={approved}
                            onChange={event => setApproved(!approved)}
                            control={<Checkbox value={approved} color="primary"/>}
                            label="Approved"
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

export default Edit;
