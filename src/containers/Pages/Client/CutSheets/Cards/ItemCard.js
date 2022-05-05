import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";

function importAll(r) {
    return r.keys().map(r);
}

const pdfs = importAll(require.context('../../../../../assets/files/Backroom Cut Sheets', false, /\.(pdf)$/));

const ItemCard = ({item}) => {
    const [pdf, setPdf] = useState(null);

    useEffect(() => {
        if (item) {
            const tempPdfIndex = pdfs.findIndex(sheet => sheet.includes(item.file));
            const tempPdf = pdfs[tempPdfIndex];
            setPdf(tempPdf);
        }
    }, [item]);

    return (
        <Card key={item.name} style={{height: '100%',maxHeight: '400px',boxShadow: '5px 5px 5px lightgrey'}}>
            <CardActionArea component={Link} to={pdf} target={'_blank'} rel={"noopener noreferrer"} style={{display: 'flex', flexDirection: 'column'}}>
                <div>
                    <CardContent>
                        <Typography gutterBottom variant="h6" style={{textAlign: 'center', wordBreak: 'break-word'}}>{item.name}</Typography>
                    </CardContent>
                </div>
            </CardActionArea>
        </Card>
    );
};

export default ItemCard;
