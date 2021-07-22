import React, {useState, Fragment} from "react";

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";

import alt_image from "../../../../../../assets/images/alt_image.jpg";
import AddToCartCard from "../AddToCartCard/AddToCartCard";
import TransitionModal from "../../../../../../components/UI/Modal/Modal";
import * as classes from "./ItemCard.module.css";

const ItemCard = ({item}) => {
    const [modalState, setModalState] = useState(false);
    const pic = item.picture ? item.picture : alt_image;

    const toggleModal = () => {
        setModalState(!modalState);
    };

    return (
        <Fragment>
            <Card key={item.key} className={classes.Card} >
                <CardActionArea className={classes.Card} onClick={toggleModal} style={{display: 'flex', flexDirection: 'column'}}>
                    <div className={classes.Title}>
                        <CardContent >
                            <Typography gutterBottom variant="h5" component="h2" style={{textAlign: 'center'}}>{item.name}</Typography>
                        </CardContent>
                    </div>
                    <div className={classes.Pic}>
                        <CardMedia
                            component="img"
                            alt={item.name}
                            image={pic}/>
                    </div>
                </CardActionArea>
            </Card>
            <TransitionModal
                open={modalState}
                handleClose={toggleModal}
                form={<AddToCartCard close={toggleModal} item={item}/>}
                title={"Item"}
            />
        </Fragment>
    );
};

export default ItemCard;
