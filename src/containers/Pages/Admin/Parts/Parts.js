import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import AutoComplete from "@material-ui/lab/Autocomplete";

import useStyles from "../../../../components/UI/Styles/formStyle";
import EnhancedTable from "../../../../components/UI/Table/Table";
import TransitionModal from "../../../../components/UI/Modal/Modal";
import * as actions from "../../../../store/actions";
import AddForm from "./Forms/AddForm/AddForm";
import EditForm from "./Forms/EditForm/EditForm";
import DeleteForm from "../../../../components/UI/Forms/DeleteForm/DeleteForm";

const headCells = [
    {id: 'name', label: 'Name'},
    {id: 'code', label: 'Part Code'},
    {id: 'category', label: 'Category'}
];

const Parts = (props) => {
    const {parts, categories} = props;
    const styles = useStyles();
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [filter, setFilter] = useState(false);
    const [filterValue, setFilterValue] = useState(null);
    const [formData, setFormData] = useState({});
    const [tableData, setTableData] = useState(parts);
    const [filteredTableData, setFilteredTableData] = useState([]);

    useEffect(() => {
        reloadParts();
        console.log("Got parts");
    }, [parts]);

    useEffect(() => {
        filterPart();
    }, [filterValue]);

    const reloadParts = () => {
        setTableData(parts);
    };

    //add modal functions
    const onAddPart = (part) => {
        props.onAddPart(part);
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
    const onDeletePart = (id) => {
        props.onRemovePart(id);
        handleDeleteClose();
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
        let filteredParts = parts.filter((part) => part.category === filterValue);
        setFilteredTableData(filteredParts);
    };

    const handleApprovedSwitch = () => {
        setFilter(!filter);
    };

    return (
        <Container>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className={styles.searchBar}>
                    <FormControl className={styles.searchInput}>
                        <AutoComplete
                            freeSolo
                            onChange={(event, value) => {
                                setFilterValue(value.name);
                            }}
                            options={categories.sort((a, b) => -b.name.charAt(0)
                                .localeCompare(a.name.charAt(0)))}
                            groupBy={(option) => option.name.charAt(0)}
                            getOptionLabel={(option) => (option.name)}
                            renderInput={(params) => (
                                <TextField {...params} key={params} variant="outlined" placeholder="Filter Category"/>
                            )}
                        />
                    </FormControl>
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
                actionEdit={handleEditOpen}
                actionDelete={handleDeleteOpen}
                actions
            />
            <TransitionModal
                open={addOpen}
                handleOpen={handleAddOpen}
                handleClose={handleAddClose}
                form={<AddForm onAdd={onAddPart} handleClose={handleAddClose} categories={categories}/>}
                title={"Add Part"}
            />
            <TransitionModal
                open={editOpen}
                handleOpen={handleEditOpen}
                handleClose={handleEditClose}
                form={<EditForm formData={formData} onEdit={onEditPart} handleClose={handleEditClose}
                                categories={categories}/>}
                title={"Edit Part"}
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
        onAddPart: (part) => dispatch(actions.onAddPart(part)),
        onRemovePart: (id) => dispatch(actions.onRemovePart(id)),
        onEditPart: (part, id) => dispatch(actions.onEditPart(part, id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Parts);
