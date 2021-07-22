import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Grow from '@material-ui/core/Grow';

import {firestore} from "../../../../../firebase";
import ItemCard from "../Cards/ItemCard/ItemCard";

const ItemView = (props) => {
    const [tableData, setTableData] = useState([]);
    let delay = 0;
    let { item } = useParams();

    useEffect(() => {
        reloadParts();
        console.log("Got parts with cate: ", item);
    }, [item]);

    async function getParts() {
        let parts = [];
        const partsRef = await firestore.collection('parts')
            .where('category', '==',  item)
            .get();
        partsRef.forEach((part) => {
            parts.push({...part.data(), id: part.id});
        });
        setTableData(parts);
    }

    const reloadParts = () => {

        getParts()
            .catch(error => {
                console.log(error)
            });
    };

    return (
        <div style={{width: '80%', margin: 'auto'}}>
            <Grid container spacing={2}>
                {tableData.map(item => {
                   delay += 100;
                    return (
                        <Grow in={true} key={item.id} style={{ transformOrigin: '0 0 0' }} {...{timeout: delay}}>
                            <Grid item xs={6} sm={3}>
                                <ItemCard item={item} />
                            </Grid>
                        </Grow>
                    );
                })}
            </Grid>
        </div>
    );
};


export default ItemView;
