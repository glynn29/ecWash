import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Fragment>
                    {children}
                </Fragment>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function CustomTabs(props) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    let panelIndex = -1;
    let tabIndex = -1;

    const handleChange = (event, newValue) => {
        props.handleTabChange(newValue);
        setValue(newValue);
    };

    return (
        <Fragment>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {props.tabLabelList.map(label => {
                        tabIndex++;
                        return(<Tab key={tabIndex} label={label} {...a11yProps(tabIndex)} />);
                    })}
                </Tabs>
            </AppBar>
            {props.componentsList.map(component => {
                panelIndex++;
                return(
                    <TabPanel value={value} index={panelIndex} dir={theme.direction} key={panelIndex}>
                        {component}
                    </TabPanel>
                );
            })}
        </Fragment>
    );
}
