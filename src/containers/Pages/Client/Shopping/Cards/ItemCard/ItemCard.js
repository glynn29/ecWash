import React, { Fragment, useState } from "react";

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";

import alt_image from "../../../../../../assets/images/alt_image.jpg";
import SearchModal from "../../../../../../components/UI/Search/SearchModal/SearchModal";
import * as classes from "./ItemCard.module.css";

const ItemCard = ({item}) => {
    const [modalState, setModalState] = useState(false);
    const pictureUrl = item.pictureUrl ? item.pictureUrl : alt_image;

    const toggleModal = () => {
        setModalState(!modalState);
    };

    return (
        <Fragment>
            <Card key={item.key} className={classes.Card}>
                <CardActionArea className={classes.Card} onClick={toggleModal} style={{display: 'flex', flexDirection: 'column'}}>
                    <div className={classes.Pic}>
                        <CardMedia
                            component={"img"}
                            alt={item.name}
                            image={pictureUrl}
                        />
                    </div>
                    <div className={classes.Title}>
                        <CardContent >
                            <Typography gutterBottom variant="h6" style={{textAlign: 'center', wordBreak: 'break-word'}}>{item.name}</Typography>
                        </CardContent>
                    </div>
                </CardActionArea>
            </Card>
            <SearchModal open={modalState} close={toggleModal} item={item}/>
        </Fragment>
    );
};

export default ItemCard;
