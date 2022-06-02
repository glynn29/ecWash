import React from "react";
import { Link } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/CardMedia";

import alt_image from "../../../../../assets/images/alt_image.jpg";

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
    }
}));

const CategoryCard = props => {
    const styles = useStyles();
    const categoryPicture = props.categoryPicture ? props.categoryPicture : alt_image;

    return (
        <Card key={props.key} style={{ height: '100%' }}>
            <CardActionArea component={Link} to={'/supportdocuments/categories/' + props.name} className={styles.root}>
                <CardContent className={styles.content}>
                    <Typography gutterBottom variant="h6">{props.name}</Typography>
                </CardContent>
                <CardMedia
                    className={styles.cover}
                    component="img"
                    alt={props.name}
                    image={categoryPicture} />
            </CardActionArea>
        </Card>
    );
};

export default CategoryCard;
