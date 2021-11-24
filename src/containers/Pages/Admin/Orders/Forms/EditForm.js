import React, {useState} from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";

import Stepper from "../../../../../components/UI/Stepper/Stepper";
import formStyles from "../../../../../components/UI/Styles/formStyle";

const EditForm = props => {
    const styles = formStyles();
    const [name, setName] = useState(props.formData.name);
    const [statusStep, setStatusStep] = useState(props.formData.statusStep);
    const [note, setNote] = useState(props.formData.note ? props.formData.note : "");
    const [partialOrder, setPartialOrder] = useState(props.formData.partialOrder);

    const submitFormHandler = (event) =>{
        event.preventDefault();
        let order = {
            ...props.formData,
            note,
            partialOrder,
            statusStep,
            status: props.statusList[statusStep - 1]
        };
        props.onEdit(order, props.formData.id);
        console.log("order EDITED");
    };

    return (
        <Container component="main" maxWidth="sm" className={styles.Container}>
            <form autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Typography>Mng name</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>Mng phone</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>City, ST</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Ordered on: {props.formData.date}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Ordered at: {props.formData.time}</Typography>
                    </Grid>
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
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControlLabel
                            control={<Checkbox
                                value={partialOrder}
                                checked={partialOrder}
                                onChange={() => setPartialOrder((prevState) => !prevState)}
                                color="primary"/>}
                            label="Partial Order"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {props.formData.items.map(item => <Typography key={item.id}>Name: {item.name}, Code: {item.code}, Category: {item.category}, Quantity: {item.amount}</Typography>)}
                    </Grid>
                    <Grid item xs={10} style={{margin: 'auto'}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Edit Order
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default EditForm;
