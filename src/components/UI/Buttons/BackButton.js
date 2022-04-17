import React from "react";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Forward from '@material-ui/icons/Forward';

export const BackButton = () => {
    let history = useHistory();
    return (
        <Button
            onClick={() => history.goBack()}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Forward style={{transform: 'rotate(180deg)'}} />}
        >
            Back
        </Button>
    );
};

export default BackButton;
