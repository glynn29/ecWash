import React, {useEffect, useState} from "react";

import EnhancedTable from "../../../../components/UI/Table/Table";
import TransitionModal from "../../../../components/UI/Modal/Modal";
import {firestore} from "../../../../firebase";

import AddPartForm from "./Forms/AddCategory/AddCategory";
import EditPartForm from "./Forms/EditCategory/EditCategory";
import DeletePartForm from "./Forms/DeleteCategory/DeleteCategory";

const headCells = [
    {id:'name', label: 'Name'},
];

const Category = () => {
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        reloadCategories();
        console.log("Got categories");
    },[]);

    async function getCategories() {
        let categories = [];
        const partsRef = await firestore.collection('categories').get();
        partsRef.forEach((category) => {
            categories.push({...category.data(), id: category.id});
        });
        setTableData(categories);
    }

    const reloadCategories = () => {
        getCategories().catch(error => {console.log(error)});
    };

    //add modal functions
    const onAddPart = () => {
        reloadCategories();
        setAddOpen(false);
    };

    const handleAddOpen = () => {
        setAddOpen(true);
    };

    const handleAddClose = () => {
        setAddOpen(false);
    };

    //edit modal functions
    function onEditPart() {
        reloadCategories();
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
    const onDeletePart = () => {
        reloadCategories();
        setDeleteOpen(false);
    };

    const handleDeleteOpen = (props) => {
        setFormData({...props});
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    return(
        <div>
            <EnhancedTable
                data={tableData}
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
                form={<AddPartForm onAdd={onAddPart} handleClose={handleAddClose}/>}
                title={"Add Part"}
            />
            <TransitionModal
                open={editOpen}
                handleOpen={handleEditOpen}
                handleClose={handleEditClose}
                form={<EditPartForm formData={formData} onEdit={onEditPart} handleClose={handleEditClose}/>}
                title={"Edit Part"}
            />

            <TransitionModal
                open={deleteOpen}
                handleOpen={handleDeleteOpen}
                handleClose={handleDeleteClose}
                form={<DeletePartForm formData={formData} onDelete={onDeletePart} cancel={handleDeleteClose} />}
                title={"Are You Sure?"}
            />
        </div>

    );
};

export default Category;
