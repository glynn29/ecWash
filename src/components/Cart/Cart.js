import Grid from "@material-ui/core/Grid";
import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {useHistory} from "react-router-dom";

import CartItem from "./CartItem/CartItem";
import * as actions from '../../store/actions/index';
import classes from "./Cart.module.css";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

const Cart = (props) => {
    const history = useHistory();
    const [items, setItems] = useState(null);
    const hasItems = props.items.length > 0;

    useEffect(() => {
        const cartItems = <ul className={classes['cart-items']}>{props.items
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
        setItems(cartItems);
    }, [props.items]);

    const handleCheckoutClick = () => {
        props.close();
        history.push('/checkout');
    };

    return (
        <Container component="main" className={classes.Container}>
            {items && items}
            {props.items.length <= 0 &&
                <div className={classes.Center}>
                    <span>Cart is empty</span>
                </div>
            }
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={hasItems ? 6 : 12}>
                        <Button onClick={props.close} variant={"outlined"} style={{width: '100%', color: '#d8222b'}}>Continue Shopping</Button>
                    </Grid>
                    {hasItems &&
                        <Grid item xs={12} sm={6}>
                            <Button variant={"contained"} style={{width: '100%', }} color={"primary"} onClick={handleCheckoutClick}>Check Out</Button>
                        </Grid>
                    }
                </Grid>
            </div>
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
