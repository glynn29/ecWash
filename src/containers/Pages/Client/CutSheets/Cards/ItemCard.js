import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";

import alt_image from "../../../../../assets/images/alt_image.jpg";
import * as classes from "../../Shopping/Cards/ItemCard/ItemCard.module.css";

const ItemCard = ({ item, pdfs }) => {
    const [pdf, setPdf] = useState("");
    const itemPicture = item.itemPicture ? item.itemPicture : alt_image;

    useEffect(() => {
        if (item) {
            const tempPdfIndex = pdfs.findIndex(sheet => sheet.includes(item.file));
            const tempPdf = pdfs[tempPdfIndex];
            setPdf(tempPdf);
        }
    }, [item]);

    return (
        <Card key={item.name} className={classes.Card}>
            <CardActionArea className={classes.CardActionArea} component={Link} to={pdf} target={'_blank'} rel={"noopener noreferrer"}>
                <div className={classes.Pic} >
                    <Document file={pdf} className={classes.Document} loading={<img src={itemPicture} alt={"img"} style={{maxHeight: '200px'}} />}>
                        <Page pageNumber={1} height={200} className={classes.Page} />
                    </Document>
                </div>
                <div className={classes.Title} style={{maxHeight: '150px'}}>
                    <CardContent>
                        <Typography gutterBottom variant="h6" style={{ textAlign: 'center', wordBreak: 'break-word' }}>{item.name}</Typography>
                    </CardContent>
                </div>
            </CardActionArea>
        </Card>
    );
};

export default ItemCard;
