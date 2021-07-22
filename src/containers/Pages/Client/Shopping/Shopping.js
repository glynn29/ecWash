import React, {useEffect, useState} from "react";

import Grid from "@material-ui/core/Grid";

import {firestore} from "../../../../firebase";
import CategoryCard from "./Cards/CategoryCard/CategoryCard";

const Shopping = (props) => {
    const [tableData, setTableData] = useState([{name: 'Bearings', id:1}, {name:'Vacuum', id:2}]);

    useEffect(() => {
        getCategories().catch(error => {console.log(error)});
        console.log("Got categories");
    },[]);

    async function getCategories() {
        let parts = [];
        const partsRef = await firestore.collection('categories').orderBy('name', 'asc').get();
        partsRef.forEach((part) => {
            parts.push({...part.data(), id: part.id});
        });
        setTableData(parts);
    }

    return (
        <div style={{ width: '80%', margin: 'auto'}}>
            <Grid container spacing={2}>
                {tableData.map(item => {
                    return (
                        <Grid item xs={12} md={6} key={item.id}>
                            <CategoryCard
                                name={item.name}
                                picture={item.picture}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default Shopping;
