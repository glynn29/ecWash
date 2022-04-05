import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import useStyles from "../../../../../components/UI/Styles/formStyle";
import { firestore } from "../../../../../firebase";
import classes from "../../../../../components/Cart/Cart.module.css";
import CartItem from "../../../../../components/Cart/CartItem/CartItem";
import * as actions from "../../../../../store/actions";

const Checkout = (props) => {
    const styles = useStyles();
    const history = useHistory();
    const [name, setName] = useState(props.managerFirst + " " + props.managerLast);
    const [phoneNumber, setPhoneNumber] = useState(props.locationPhone);
    const items2 = [{
        category: "Air",
        name: "AIR:1/2 x 3/8-PTFxMNPT Straight",
        id: "s97cLTdt8RUbmTifMgJp",
        details: null,
        amount: 1,
        pictureUrl: "https://firebasestorage.googleapis.com/v0/b/carwash-57347.appspot.com/o/parts%2FAir%2FAIR%3A1%2F2inchx3%2F8inch-PTFxMNPT%20Straight?alt=media&token=51d1e302-5e97-4afc-b756-4d7014869b5b"
    }, {
        id: "oEaSp5q9RsLMi9fvmAF8",
        details: null,
        name: "AIR:1/2-PTF x MNPT Straight",
        amount: 1,
        pictureUrl: "https://firebasestorage.googleapis.com/v0/b/carwash-57347.appspot.com/o/parts%2FAir%2FAIR%3A1%2F2inch-PTF%20x%20MNPT%20Straight?alt=media&token=3b308f5d-b8be-4b8d-a1ed-2eb2deed389e",
        category: "Air"
    }];
    const {items, zip, email, nickName, address, city, state} = props;
    const cartItems = <ul className={`${classes.cartItems} ${classes.CheckOutHeight}`}>{items
        .map((item) => (
            <CartItem
                key={item.id}
                price={item.price}
                amount={item.amount}
                name={item.name}
                onAdd={() => props.onAddItem(item, 1)}
                onRemove={() => props.onRemoveItem(item.id)}
            />
        ))}</ul>;

    const submitOrderHandler = (e) => {
        e.preventDefault();
        let cleanedItems = [];
        items.forEach(item => {
            let cleanedItem = {...item};
            delete cleanedItem.details;
            cleanedItems.push(cleanedItem)
        });
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();

        firestore.collection("orders")
            .add(
                {
                    status: 'new',
                    statusStep: 1,
                    date,
                    time,
                    name,
                    nickName,
                    email,
                    phoneNumber,
                    address,
                    city,
                    state,
                    zip,
                    items: cleanedItems,
                }
            )
            .then(() => {
                props.orderComplete();
                props.clearItems();
                history.replace('/');
            })
            .catch(error => console.log(error));
    };

    return (
        <Container style={{textAlign: 'center'}}>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                    <Card style={{border: "solid 1px black"}}>
                        <Typography variant={"h5"}>Order Summary</Typography>
                        <Container style={{overflow: 'auto'}}>
                            {cartItems}
                        </Container>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card style={{border: "solid 1px black"}}>
                        <Typography variant={"h5"}>Customer Information</Typography>
                        <br/>
                        <Container>
                            <form onSubmit={submitOrderHandler}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            value={name}
                                            onChange={event => setName(event.target.value)}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Customer Name"
                                            autoFocus
                                            inputProps={{maxLength: 63}}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            value={phoneNumber}
                                            onChange={event => setPhoneNumber(event.target.value)}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="phoneNumber"
                                            label="Customer Phone Number"
                                            inputProps={{maxLength: 10}}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type={"submit"} color={"primary"} variant={"contained"}
                                                className={styles.submit}
                                                disabled={items.length < 1}>Order</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Container>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        items: state.cart.items,
        zip: state.auth.zip,
        email: state.auth.email,
        managerFirst: state.auth.first,
        managerLast: state.auth.last,
        nickName: state.auth.nickName,
        locationPhone: state.auth.locationPhone,
        address: state.auth.address,
        city: state.auth.city,
        state: state.auth.state,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddItem: (item, amount) => dispatch(actions.onAddItem(item, amount)),
        onRemoveItem: (id) => dispatch(actions.onRemoveItem(id)),
        clearItems: () => dispatch(actions.clearItems()),
        orderComplete: () => dispatch(actions.orderComplete())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
