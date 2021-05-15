import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';

import CartItem from "./CartItem/CartItem";
import * as actions from '../../store/actions/index';
import classes from "./Cart.module.css";

import Container from "@material-ui/core/Container";

const Cart = (props) => {
    const [items, setItems] = useState(null);
    const [totalPrice, setTotalPrice] = useState('0');
    const hasItems = props.items.length > 0;

    useEffect(() => {
        const cartItems = <ul className={classes['cart-items']}>{props.items
            .map((item) => (
                <CartItem
                    key={item.id}
                    price={item.price}
                    amount={item.amount}
                    name={item.name}
                    onAdd={props.onAddItem.bind(null, item)}
                    onRemove={props.onRemoveItem.bind(null, item.id)}
                />
            ))}</ul>;
        setItems(cartItems);
        setTotalPrice(props.total.toFixed(2))
    }, [props.total, props.items]);

    return (
        <Container component="main" maxWidth="sm" className={classes.Container} style={{overflow:'auto'}}>
          {items && items}
            {totalPrice > 0 ?
                <div className={classes.total}>
                    <span>Total</span>
                    <span>{totalPrice}</span>
                </div> :
                <div className={classes.Center}>
                    <span>Nothing in cart bruh</span>
                </div>
            }
          <div className={classes.actions}>
              <button onClick={() => props.onAddItem({id: 1, name: 'Poop', amount: 2, price: 12.99})}>add</button>
              <button  onClick={() => props.onRemoveItem(1)}>remove</button>
              <button className={classes['button-alt']} onClick={props.close}>Close</button>
              {hasItems && <button className={classes.button}>Order</button>}
          </div>
        </Container>
    );
};

const mapStateToProps = state => {
    return{
        total: state.cart.total,
        items: state.cart.items,
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onAddItem: (item) => dispatch(actions.onAddItem(item)),
        onRemoveItem: (id) => dispatch(actions.onRemoveItem(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
