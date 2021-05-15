import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';

import classes from "./HeaderCartButton.module.css";

import CartIcon from "../../../../assets/icons/CartIcon/CartIcon";
import * as actions from "../../../../store/actions";

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    const numberOfCartItems = (props.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    },0));

    useEffect(() => {
        if (props.items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [props.items]);

    return(
      <button className={btnClasses} onClick={props.open}>
          <span className={classes.icon}>
              <CartIcon />
          </span>
          <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    );
};

const mapStateToProps = state => {
    return{
        items: state.cart.items,
    };
};

export default connect(mapStateToProps)(HeaderCartButton);
