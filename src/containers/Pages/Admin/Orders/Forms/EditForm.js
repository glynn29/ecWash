import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import Stepper from "../../../../../components/UI/Stepper/Stepper";
import formStyles from "../../../../../components/UI/Styles/formStyle";
import ManagerDialog from "../../../../../components/UI/Dialog/ManagerDialog";
import Item from "./Item";
import { getTimestamp } from "../../../../../firebase";

const EditForm = props => {
    const styles = formStyles();
    const [statusStep, setStatusStep] = useState(props.formData.statusStep);
    const [note, setNote] = useState(props.formData.note ? props.formData.note : "");
    const [partialOrder, setPartialOrder] = useState(props.formData.partialOrder ? props.formData.partialOrder : false);
    const [items, setItems] = useState(props.formData.items);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        setItems(extractItems(props.formData.items));
    }, [props.formData.items]);

    const extractItems = (items) => {
        let tempItems = [];
        items.forEach(item => {
            const partIndex = props.parts.findIndex(part => part.id === item.itemId);
            const part = props.parts[partIndex];
            tempItems.push(part);
        });
        return tempItems;
    };

    const submitFormHandler = (event) => {
        event.preventDefault();
        const timeStamp = getTimestamp();
        let order = {
            updatedAt: timeStamp,
            note: note,
            partialOrder: partialOrder,
            statusStep,
            status: props.statusList[statusStep - 1]
        };
        props.onEdit(order, props.formData.id);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    // TODO fix scroll of form
    return (
        <Container component="main" maxWidth="sm" className={styles.container}>
            <form autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2}>
                    {/*TODO remove comment and move to just email*/}
                    {props.formData.comment && <Grid item xs={12}>
                        <TextField multiline minRows={4} disabled={true} value={props.formData.comment} variant="outlined" fullWidth
                                   label="Customer Comments" />
                    </Grid>}
                    <Grid item xs={12}>
                        <Stepper statusList={props.statusList} status={statusStep} setStatus={setStatusStep} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            value={note}
                            onChange={event => setNote(event.target.value)}
                            id="outlined-textarea"
                            label="Note"
                            multiline
                            variant="outlined"
                            fullWidth
                            minRows={3}
                            inputProps={{className: styles.textarea}}
                        />
                    </Grid>
                    <Grid item xs={9} style={{display: 'flex', alignItems: 'start'}}>
                        <FormControlLabel
                            control={<Checkbox
                                value={partialOrder}
                                checked={partialOrder}
                                onChange={() => setPartialOrder((prevState) => !prevState)}
                                color="primary" />}
                            label="Partially Complete Order"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Tooltip title="Manager Info">
                            <IconButton color="primary" component="span" onClick={handleDialogOpen}>
                                <AccountCircleIcon />
                            </IconButton>
                        </Tooltip>
                        <ManagerDialog users={props.users} formData={props.formData} open={dialogOpen} onClose={handleDialogClose} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1} style={{maxHeight: '200px', overflow: 'auto'}}>
                            {items.map(item => <Grid item xs={12} key={item.id}><Item item={item} /></Grid>)}
                        </Grid>
                    </Grid>
                    <Grid item xs={10} style={{margin: 'auto'}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Save Order
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        parts: state.parts.parts,
        users: state.users.users,
    };
};

export default connect(mapStateToProps)(EditForm);
