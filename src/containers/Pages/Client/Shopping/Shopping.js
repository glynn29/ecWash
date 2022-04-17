import React from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import CategoryCard from "./Cards/CategoryCard/CategoryCard";

const Shopping = (props) => (
    <Container>
        <Grid container spacing={2}>
            {props.categories.map(item => {
                return (
                    <Grid item xs={12} md={6} lg={4} key={item.id}>
                        <CategoryCard
                            name={item.name}
                            pictureUrl={item.pictureUrl}
                        />
                    </Grid>
                );
            })}
        </Grid>
    </Container>
);

const mapStateToProps = state => {
    return {
        categories: state.categories.categories,
    };
};

export default connect(mapStateToProps, null)(Shopping);
