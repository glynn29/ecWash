import React from "react";
import { Link } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1',
        height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    cover: {
        width: 100,
        height: '100%'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

const CategoryCard = props => {
    const styles = useStyles();
    return (
        <Card key={props.key} style={{height: '100%'}}>
            <CardActionArea component={Link} to={'/cutsheets/categories/' + props.name} className={styles.root}>
                <CardContent className={styles.content}>
                    <Typography gutterBottom variant="h6">{props.name}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CategoryCard;
