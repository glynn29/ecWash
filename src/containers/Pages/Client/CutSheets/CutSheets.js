import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import CategoryCard from "./Cards/CategoryCard";

const CutSheets = (props) => {
    const [cutSheetCategories, setCutSheetCategories] = useState([]);

    useEffect(() => {
        const unique = [...new Set(props.cutSheets.sort((a, b) => a.category > b.category ? 1 : -1).map(item => item.category.trim()))];
        setCutSheetCategories(unique);
    }, [props.cutSheets]);

    return (
        <Container>
            <Grid container spacing={2}>
                {cutSheetCategories.map(item => {
                    return (
                        <Grid item xs={12} md={6} lg={4} key={item}>
                            <CategoryCard
                                name={item}
                                cutSheets={props.cutSheets}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        cutSheets: state.cutSheets.cutSheets,
    };
};

export default connect(mapStateToProps)(CutSheets);
