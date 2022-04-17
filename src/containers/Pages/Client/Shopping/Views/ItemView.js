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
        reloadParts();
    }, [category, props.parts]);

    const reloadParts = () => {
        let parts = props.parts.filter((part) => part.category === category);
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
    };
};

export default connect(mapStateToProps, null)(ItemView);
