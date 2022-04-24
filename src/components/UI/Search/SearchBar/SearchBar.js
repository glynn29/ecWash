import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AutoComplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

import useStyles from "../../Styles/formStyle";
import SearchModal from "../SearchModal/SearchModal";

const SearchBar = (props) => {
    const {parts, categories} = props;
    const history = useHistory();
    const styles = useStyles();
    const [modalOpen, setModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchItem, setSearchItem] = useState(null);
    const [searchParam, setSearchParam] = useState("parts");
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (searchParam) {
            reloadItems();
        }
    }, [searchParam]);

    useEffect(() => {
        setTableData(parts);
    }, [parts]);

    const reloadItems = () => {
        if (searchParam === "parts") {
            setTableData(parts);
        } else if (searchParam === "categories") {
            setTableData(categories);
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuClick = (searchParam) => {
        setSearchParam(searchParam);
        setSearchItem(null);
        handleClose();
    };

    const handleSearchClick = () => {
        if (searchParam === "parts") {
            setModalOpen(true);
        } else {
            history.push('/shopping/categories/' + searchItem.name);
        }
    };

    const handleSearchOnChange = (value) => {
        if (value) {
            if (searchParam === "parts") {
                setModalOpen(true);
            } else if (searchParam === "categories") {
                history.push('/shopping/categories/' + value.name);
            }
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        handleClearItem();
    };

    const handleClearItem = () => {
        setSearchItem(null);
    };

    return (
        <div>
            <Paper component="form" className={styles.searchBar}>
                <IconButton className={styles.iconButton} aria-label="menu" onClick={handleClick}>
                    <MenuIcon/>
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => handleMenuClick("parts")}>Search Parts</MenuItem>
                    <MenuItem onClick={() => handleMenuClick("categories")}>Search Categories</MenuItem>
                </Menu>
                <FormControl className={styles.searchInput}>
                    <AutoComplete
                        freeSolo
                        value={searchItem}
                        onChange={(event, value) => {
                            setSearchItem(value);
                            handleSearchOnChange(value);
                        }}
                        options={tableData.sort((a, b) => -b.name.charAt(0)
                            .localeCompare(a.name.charAt(0)))}
                        groupBy={(option) => option.name.charAt(0)}
                        getOptionLabel={(option) => (option.name)}
                        renderInput={(params) => (
                            <TextField {...params} key={params} variant="outlined" placeholder={"Search " + searchParam.charAt(0)
                                .toUpperCase() + searchParam.substr(1)}/>
                        )}
                    />
                </FormControl>
                <IconButton className={styles.searchIconButton}
                            aria-label="search"
                            disabled={searchItem === null}
                            onClick={handleSearchClick}>
                    <SearchIcon/>
                </IconButton>
            </Paper>
            <SearchModal open={modalOpen} close={handleModalClose} item={searchItem}/>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        parts: state.parts.parts,
        categories: state.categories.categories
    };
};

export default connect(mapStateToProps)(SearchBar)
