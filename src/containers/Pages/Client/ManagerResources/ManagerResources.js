import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";

import ItemCard from "../CutSheets/Cards/ItemCard";
import EC_Recommended_Maintenance from "../../../../assets/files/Manager Resources/EC_Recommended_Maintenance.pdf";

const ManagerResources = () => {
    const item = {
        name: "Recommended Preventive Maintenance",
        file: "EC_Recommended_Maintenance"
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grow in={true} key={item.name} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 100 }}>
                    <Grid item xs={6} sm={4} md={3} lg={2}>
                        <ItemCard item={item} pdfs={[EC_Recommended_Maintenance]} />
                    </Grid>
                </Grow>
            </Grid>
        </Container>
    );
};

export default ManagerResources;
