import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import classes from "./HeaderCartButton.module.css";

const StyledBadge = withStyles(() => ({
    badge: {
        color: '#fff', backgroundColor: '#d8222b'
    },
}))(Badge);

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const btnClasses = `${classes.cart} ${btnIsHighlighted ? classes.bump : ''}`;
    const btnClasses2 = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    const numberOfCartItems = (props.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0));

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


    return (
        <IconButton className={btnClasses2} onClick={props.open}>
            <StyledBadge badgeContent={numberOfCartItems} showZero>
                <ShoppingCartIcon className={btnClasses} fontSize={"large"}/>
            </StyledBadge>
        </IconButton>
    );
};

const mapStateToProps = state => {
    return {
        items: state.cart.items,
    };
};

export default connect(mapStateToProps)(HeaderCartButton);
