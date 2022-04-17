import React from "react";

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import classes from './CartItem.module.css';

const CartItem = (props) => (
    <li className={classes['cart-item']}>
        <div>
            <div className={classes.summary}>
                <h2>{props.name}</h2>
                <span className={classes.amount}>x {props.amount}</span>
            </div>
        </div>
        <div className={classes.actions}>
            <button onClick={props.onRemove} disabled={props.isLoading}>{props.amount === 1 ? <DeleteIcon/> : <RemoveIcon/>}</button>
            <button onClick={props.onAdd} disabled={props.isLoading}><AddIcon/></button>
        </div>
    </li>
);

export default CartItem;
