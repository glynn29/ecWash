import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";

import alt_image from "../../../../../../assets/images/alt_image.jpg";
import * as actions from "../../../../../../store/actions";
import * as classes from "../ItemCard/ItemCard.module.css";

const AddToCartCard = ({item, onAddItem, close}) => {
    const [amount, setAmount] = useState('1');
    const [intAmount, setIntAmount] = useState(1);
    const pictureUrl = (item && item.pictureUrl) ? item.pictureUrl : alt_image;

    const handleInputChange = (e) => {
        setAmount(e.target.value);
        setIntAmount(parseInt(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddItem(item, intAmount);
        close();
        //TODO add snackbar
    };

    return (
        <Container component="main" maxWidth="md" style={{textAlign: 'center', padding: 2, width: '90%'}}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.Pic}>
                        <CardMedia
                            component="img"
                            alt={item && item.name}
                            image={pictureUrl}/>
                    </Grid>
                    <Grid container spacing={2} style={{margin: '0 auto', alignItems: 'end'}}>
                        <Grid item xs={12}>
                            <Typography variant={"body2"}
                                        style={{textAlign: 'left'}}>Description: {item && item.details}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl style={{width: '100%'}}>
                                <TextField type={"number"}
                                           onChange={(e) => handleInputChange(e)}
                                           value={amount}
                                           variant={"outlined"}
                                           label={"Quantity"}
                                           InputProps={{inputProps: {min: 1, max: 5000, step: 1}}}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={() => close()} variant={"outlined"}
                                    style={{width: '100%', color: '#d8222b'}}>Close</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button type={"submit"} variant={"contained"} color={"primary"} style={{width: '100%'}}>Add
                                to Cart</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
         </Container>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onAddItem: (item, amount) => dispatch(actions.onAddItem(item, amount)),
    }
};

export default connect(null, mapDispatchToProps)(AddToCartCard);
