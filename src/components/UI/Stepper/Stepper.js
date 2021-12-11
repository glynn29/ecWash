import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    }
}));

export default function CustomStepper({statusList, status, setStatus}) {
    const classes = useStyles();
    const steps = statusList;

    const handleNext = () => {
        setStatus((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setStatus((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setStatus(1);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={status} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {status === steps.length ? (
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                        <Typography>Order has been completed</Typography>
                        <Button onClick={handleReset} style={{color: 'red'}}>Reset</Button>
                    </div>
                ) : (
                    <div>
                        <div>
                            <Button disabled={status === 1} onClick={handleBack} className={classes.button}>
                                Undo
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {status === steps.length - 1 ? 'Complete Order' : 'Advance Status'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
