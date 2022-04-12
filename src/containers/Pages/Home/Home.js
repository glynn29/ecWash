import React from "react";

import Typography from "@material-ui/core/Typography";

import * as classes from './Home.module.css';
import useStyles from "../../../components/UI/Styles/formStyle";

const Home = () => {
    const styles = useStyles();

    return (
        <div style={{marginTop: '-20px'}}>
            <div className={classes.Hero}/>
            <div style={{textAlign: 'center'}}>
                <Typography className={styles.homeTitle}>
                    Express Car Wash Equipment
                </Typography>
                <Typography className={styles.homeTagLine}>
                    Your Car Wash Experience Made EC
                </Typography>
            </div>
        </div>
    );
};

export default Home;
