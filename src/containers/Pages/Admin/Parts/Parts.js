import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import AutoComplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";

import useStyles from "../../../../components/UI/Styles/formStyle";
import EnhancedTable from "../../../../components/UI/Table/Table";
import TransitionModal from "../../../../components/UI/Modal/Modal";
import * as actions from "../../../../store/actions";
import AddForm from "./Forms/AddForm/AddForm";
import EditForm from "./Forms/EditForm/EditForm";
import DeleteForm from "../../../../components/UI/Forms/DeleteForm/DeleteForm";
import { storageRef } from "../../../../firebase";

const Parts = (props) => {
    const {categories} = props;
    const styles = useStyles();
    const [parts, setParts] = useState([...props.parts]);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [filter, setFilter] = useState(false);
    const [filterValue, setFilterValue] = useState(null);
    const [formData, setFormData] = useState({});
    const [tableData, setTableData] = useState(props.parts);
    const [filteredTableData, setFilteredTableData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchParam, setSearchParam] = useState("parts");
    const [filterItems, setFilterItems] = useState(props.parts);

    useEffect(() => {
        if (props.parts.length > 0 && categories.length > 0) {
            let completeParts = [];
            props.parts.forEach(part => {
                const categoryIndex = categories.findIndex(categoryItem => categoryItem.id === part.categoryId);
                const category = categories[categoryIndex];
                completeParts.push({...part, category: category.name})
            });
            setParts(completeParts);
        }
    }, [props.parts, categories]);

    useEffect(() => {
        if (searchParam) {
            reloadItems();
        }
    }, [props.parts, categories, searchParam, parts]);

    useEffect(() => {
        if (filterValue) {
            filterPart();
        }
    }, [filterValue]);

    const reloadItems = () => {
        setTableData(parts);
        if (searchParam === "parts") {
            setFilterItems(parts);
        } else if (searchParam === "categories") {
            setFilterItems(categories);
        }
    };

    //add modal functions
    const onAddPart = (part, id) => {
        props.onAddPart(part, id);
        handleAddClose();
    };

    const handleAddOpen = () => {
        setAddOpen(true);
    };

    const handleAddClose = () => {
        setAddOpen(false);
    };

    //edit modal functions
    function onEditPart(part, id) {
        props.onEditPart(part, id);
        handleEditClose();
    }

    const handleEditOpen = (props) => {
        setFormData({...props});
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    //delete modal functions
    const onDeletePart = async (id) => {
        let pictureError = false;
        if (formData.pictures.length > 0) {
            await deletePhotoFromStorage(formData.categoryId, formData.id, formData.pictures[0].pictureName)
                .catch((error) => {
                    pictureError = true;
                    console.log(error);
                });
        }
        if (!pictureError) {
            props.onRemovePart(id);
            handleDeleteClose();
        }
    };

    const deletePhotoFromStorage = (categoryId, partId, pictureName) => {
        try {
            const deleteRef = storageRef.child('parts')
                .child(categoryId)
                .child(partId)
                .child(pictureName);
            return new Promise((resolve, reject) => {
                deleteRef.delete()
                    .then(() => {
                        resolve("success");
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
        } catch (e) {
            return Promise.reject();
        }
    };

    const handleDeleteOpen = (props) => {
        setFormData({...props});
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    //filter modal functions
    const filterPart = () => {
        let filteredParts = [];
        if (searchParam === "parts") {
            filteredParts = parts.filter((part) => part.name === filterValue);
        } else if (searchParam === "categories") {
            filteredParts = parts.filter((part) => part.category === filterValue);
        }
        filteredParts.sort(function (a, b) {
            return ('' + a.name).localeCompare(b.name);
        });
        setFilteredTableData(filteredParts);
    };

    const handleApprovedSwitch = () => {
        setFilter(!filter);
    };

    const handleSearchOnChange = (value) => {
        if (value) {
            setFilter(true);
        }
    };

    //menu functions
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuClick = (searchParam) => {
        setSearchParam(searchParam);
        setFilterValue("");
        setFilter(false);
        handleClose();
    };

    const headCells = [
        {id: 'name', label: 'Name'},
        {id: 'category', label: 'Category'},
        {id: 'edit', label: 'Edit', click: handleEditOpen, buttonClass: 'editButton', noSort: true},
        {id: 'delete', label: 'Delete', click: handleDeleteOpen, buttonClass: 'deleteButton', noSort: true}
    ];

    return (
        <Container>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className={styles.searchBar}>
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
                            <MenuItem onClick={() => handleMenuClick("parts")}>Filter Parts</MenuItem>
                            <MenuItem onClick={() => handleMenuClick("categories")}>Filter Categories</MenuItem>
                        </Menu>
                        <FormControl className={styles.searchInput}>
                            <AutoComplete
                                value={filterValue}
                                freeSolo
                                onChange={(event, value) => {
                                    if (value) {
                                        setFilterValue(value.name);
                                        handleSearchOnChange(value.name);
                                    } else {
                                        setFilter(false);
                                    }
                                }}
                                options={filterItems.sort((a, b) => -b.name.charAt(0)
                                    .localeCompare(a.name.charAt(0)))}
                                groupBy={(option) => option.name.charAt(0)}
                                getOptionLabel={(option) => option.name ? option.name : option}
                                renderInput={(params) => (
                                    <TextField {...params} key={params} variant="outlined"
                                               placeholder={"Filter " + searchParam.charAt(0)
                                                   .toUpperCase() + searchParam.substr(1)}/>
                                )}
                            />
                        </FormControl>
                    </Paper>
                </div>
                <p style={{padding: 10}}/>
                <FormControlLabel
                    disabled={filterValue === null}
                    style={{float: 'right'}}
                    control={<Switch checked={filter} onChange={handleApprovedSwitch}/>}
                    label={filter ? "Disable Filter" : "Enable Filter"}
                />
            </div>
            <br/>
            <Divider style={{width: "95%", margin: 'auto'}}/>
            <br/>
            <EnhancedTable
                data={filter ? filteredTableData : tableData}
                headCells={headCells}
                add={handleAddOpen}
            />
            <TransitionModal
                open={addOpen}
                handleOpen={handleAddOpen}
                handleClose={handleAddClose}
                form={<AddForm onAdd={onAddPart} handleClose={handleAddClose} categories={categories}/>}
                title={"Add Part"}
                alignTop
            />
            <TransitionModal
                open={editOpen}
                handleOpen={handleEditOpen}
                handleClose={handleEditClose}
                form={<EditForm formData={formData} onEdit={onEditPart} handleClose={handleEditClose}
                                categories={categories} deletePhotoFromStorage={deletePhotoFromStorage} />}
                title={"Edit Part"}
                alignTop
            />
            <TransitionModal
                open={deleteOpen}
                handleOpen={handleDeleteOpen}
                handleClose={handleDeleteClose}
                form={<DeleteForm formData={formData} onDelete={onDeletePart} cancel={handleDeleteClose}
                                  buttonText={"Delete Part"} title={"Delete " + formData.name + "?"}/>}
                title={"Are You Sure?"}
            />
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        parts: state.parts.parts,
        categories: state.categories.categories,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPart: (part, id) => dispatch(actions.onAddPart(part, id)),
        onRemovePart: (id) => dispatch(actions.onRemovePart(id)),
        onEditPart: (part, id) => dispatch(actions.onEditPart(part, id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Parts);
