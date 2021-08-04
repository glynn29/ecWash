import React, {useEffect, useState} from "react";

import EnhancedTable from "../../../../components/UI/Table/Table";
import TransitionModal from "../../../../components/UI/Modal/Modal";
import {firestore} from "../../../../firebase";

import AddCategory from "./Forms/AddCategory/AddCategory";
import EditPartForm from "./Forms/EditCategory/EditCategory";
import DeleteForm from "../../../../components/UI/Forms/DeleteForm/DeleteForm";

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
        handleAddClose();
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
    const onDeletePart = (id) => {
        firestore.collection("categories").doc(id).delete()
            .catch((error) => {
                console.log(error);
            });
        reloadCategories();
        handleDeleteClose();
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
                form={<AddCategory onAdd={onAddPart}/>}
                title={"Add Category"}
            />
            <TransitionModal
                open={editOpen}
                handleOpen={handleEditOpen}
                handleClose={handleEditClose}
                form={<EditPartForm formData={formData} onEdit={onEditPart}/>}
                title={"Edit Category"}
            />
            <TransitionModal
                open={deleteOpen}
                handleOpen={handleDeleteOpen}
                handleClose={handleDeleteClose}
                form={<DeleteForm formData={formData} onDelete={onDeletePart} title={"Delete " + formData.name + " category?"} buttonText={"Delete Category"}/>}
                title={"Are You Sure?"}
            />
        </div>
    );
};

export default Category;
