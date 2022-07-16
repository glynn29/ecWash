import React from "react";
import { Link } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

import alt_image from '../../../../../../assets/images/alt_image.jpg';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        height: '100%'
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
    card: {
        height: '100%',
        border: '1px solid lightgrey',
        borderRadius: '15px',
        borderBottom: '0'
    }
}));

const CategoryCard = props => {
    const styles = useStyles();
    const pic = props.pictureUrl ? props.pictureUrl : alt_image;

    return (
        <Card key={props.key} className={styles.card}>
            <CardActionArea component={Link} to={'/shopping/categories/' + props.name} className={styles.root}>
                <CardContent className={styles.content}>
                    <Typography gutterBottom variant="h6">{props.name}</Typography>
                </CardContent>
                <div style={{ backgroundColor: 'lightgrey', height: '100%' }}>
                    <CardMedia
                        className={styles.cover}
                        component="img"
                        alt={props.name}
                        image={pic} />
                </div>
            </CardActionArea>
        </Card>
    );
};

export default CategoryCard;
