import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Grow from '@material-ui/core/Grow';
import Container from "@material-ui/core/Container";

import ItemCard from "./Cards/ItemCard";
import BackButton from "../../../../components/UI/Buttons/BackButton";

const SheetsView = (props) => {
    const [sheets, setSheets] = useState([]);
    let { category } = useParams();
    let delay = 0;

    useEffect(() => {
        const tempSheets = props.cutSheets.filter(item => item.category === category);
        setSheets(tempSheets)
    }, [props.cutSheets, category]);

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <BackButton />
                </Grid>
                {sheets.map(item => {
                    delay += 100;
                    return (
                        <Grow in={true} key={item.name} style={{ transformOrigin: '0 0 0' }} {...{ timeout: delay }}>
                            <Grid item xs={6} sm={4} md={3} lg={2}>
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
        cutSheets: state.cutSheets.cutSheets,
    };
};

export default connect(mapStateToProps)(SheetsView);
