import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import useStyles from "../../../../../components/UI/Styles/formStyle";
import {firestore} from "../../../../../firebase";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import classes from "../../../../../components/Cart/Cart.module.css";
import CartItem from "../../../../../components/Cart/CartItem/CartItem";

import * as actions from "../../../../../store/actions";

const Checkout = (props) => {
    const styles = useStyles();
    const history = useHistory();
    const [name, setName] = useState();
    const {items} = props;
    const cartItems = <ul className={classes['cart-items']}>{items
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

    useEffect(() => {
        if (items.length < 1) {
            history.replace('/');
        }
    },[items]);

    const handleOrderClick = () => {
        const cleanedItems = items.map(item => {
            delete item.picture;
            delete item.details;
            return(item);
        });

        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();

        firestore.collection("orders").add({
            status: 'new',
            date,
            time,
            name,
            items: cleanedItems,
        }).then(() => {
            alert("order completed");
            props.clearItems();
        }).catch(error => console.log(error));
    };

    return(
        <Container style={{textAlign: 'center'}}>
            Items yo!
            {cartItems}
            <FormControl className={styles.formControl}>
                <TextField
                    value={name}
                    onChange={event => setName(event.target.value)}
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Customer Name"
                    autoFocus
                />
            </FormControl>
            <Button onClick={handleOrderClick} color={"primary"} variant={"contained"}>Order</Button>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        items: state.cart.items,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddItem: (item, amount) => dispatch(actions.onAddItem(item, amount)),
        onRemoveItem: (id) => dispatch(actions.onRemoveItem(id)),
        clearItems: () => dispatch(actions.clearItems()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
