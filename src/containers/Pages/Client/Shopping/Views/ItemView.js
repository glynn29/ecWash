import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Grow from '@material-ui/core/Grow';
import Container from "@material-ui/core/Container";

import ItemCard from "../Cards/ItemCard/ItemCard";
import BackButton from "../../../../../components/UI/Buttons/BackButton";

const ItemView = (props) => {
    const [tableData, setTableData] = useState([]);
    let { category } = useParams();
    let delay = 0;

    useEffect(() => {
        if (category && props.parts.length > 0 && props.categories.length > 0) {
            reloadParts();
        }
    }, [category, props.parts, props.categories]);

    const reloadParts = () => {
        const categoryIndex = props.categories.findIndex(tempCategory => tempCategory.name === category);
        const categoryId = props.categories[categoryIndex].id;
        const parts = props.parts.filter((part) => part.categoryId === categoryId);
        setTableData(parts);
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <BackButton/>
                </Grid>
                {tableData.map(item => {
                   delay += 100;
                    return (
                        <Grow in={true} key={item.id} style={{ transformOrigin: '0 0 0' }} {...{timeout: delay}}>
                            <Grid item xs={6} sm={4} md={3} lg={2} >
                                <ItemCard item={item} />
                            </Grid>
                        </Grow>
                    );
                })}
            </Grid>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        parts: state.parts.parts,
        categories: state.categories.categories,
    };
};

export default connect(mapStateToProps, null)(ItemView);
