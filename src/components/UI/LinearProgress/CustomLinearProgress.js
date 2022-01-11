import React from "react";

import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

const CustomLinearProgress = (props) => (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box sx={{width: '100%', mr: 1}}>
            <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{minWidth: 35}}>
            <Typography variant="body2">{`${Math.round(
                props.value,
            )}%`}</Typography>
        </Box>
    </Box>
);

export default CustomLinearProgress;
