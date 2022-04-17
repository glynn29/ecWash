import React from "react";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

const Item = ({item}) => (
    <Card style={{padding: '4px'}}>
        <Typography>{item.name} <span style={{fontWeight: 'bold'}}>X</span> {item.amount}</Typography>
    </Card>
);

export default Item;
