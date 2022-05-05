import React from "react";

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";

import alt_image from '../../../assets/images/alt_image.jpg';
import classes from './CartItem.module.css';

const CartItem = props => {
    const pic = props.pictureUrl ? props.pictureUrl : alt_image;

    return (
        <Card key={props.key} className={classes['cart-item']}>
            <CardMedia
                className={classes.cover}
                component="img"
                alt={props.name}
                image={pic} />
            <Box className={classes.content}>
                <CardContent style={{flex: '1 0 auto'}}>
                    <Typography variant="h6">{props.name}</Typography>
                </CardContent>
                <Box className={classes.actions}>
                    <button onClick={props.onRemove} disabled={props.isLoading}>{props.amount === 1 ? <DeleteIcon /> : <RemoveIcon />}</button>
                    <button onClick={props.onAdd} disabled={props.isLoading}><AddIcon /></button>
                </Box>
            </Box>
        </Card>
    );
};

export default CartItem;
