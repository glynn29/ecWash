import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";

import Stepper from "../../../../../components/UI/Stepper/Stepper";
import formStyles from "../../../../../components/UI/Styles/formStyle";
import Item from "./Item";

const EditForm = props => {
    const styles = formStyles();
    const [statusStep, setStatusStep] = useState(props.formData.statusStep);
    const [note, setNote] = useState(props.formData.note ? props.formData.note : "");
    const [partialOrder, setPartialOrder] = useState(props.formData.partialOrder);

    const submitFormHandler = (event) => {
        event.preventDefault();
        let order = {
            ...props.formData,
            note: note,
            partialOrder: partialOrder,
            statusStep,
            status: props.statusList[statusStep - 1]
        };
        props.onEdit(order, props.formData.id);
    };

    // TODO fix scroll of form
    return (

        <Container component="main" maxWidth="sm" className={styles.container}>
            <form autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Typography>Mng name: {props.formData.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>Mng phone: {props.formData.phoneNumber}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>Wash Zip: {props.formData.zip}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Ordered on: {props.formData.date}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Ordered at: {props.formData.time}</Typography>
                    </Grid>
                    {props.formData.comment && <Grid item xs={12}>
                        <TextField multiline rows={4} disabled={true} value={props.formData.comment} variant="outlined" fullWidth label="Customer Comments"/>
                    </Grid>}
                    <Grid item xs={12}>
                        <Stepper statusList={props.statusList} status={statusStep} setStatus={setStatusStep}/>
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
                            rows={4}
                            inputProps={{className: styles.textarea}}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControlLabel
                            control={<Checkbox
                                value={partialOrder}
                                checked={partialOrder}
                                onChange={() => setPartialOrder((prevState) => !prevState)}
                                color="primary"/>}
                            label="Partially Complete Order"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1} style={{maxHeight: '200px', overflow: 'auto'}}>
                            {props.formData.items.map(item => <Grid item xs={12} key={item.id}><Item item={item}/></Grid>)}
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

export default EditForm;
