import React from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';

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
                <br />
                <Button
                    component={Link}
                    href={"/login"}
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.Button}
                    startIcon={<PersonOutlinedIcon  />}
                >
                    Login
                </Button>
                <Button
                    component={Link}
                    href={"/register"}
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.Button}
                    startIcon={<PersonAddOutlinedIcon  />}
                >
                    Register
                </Button>
            </div>
        </div>
    );
};

export default Home;
