import React, {useEffect, useState} from "react";
import TransitionModal from "../../../../components/UI/Modal/Modal";

import EnhancedTable from "../../../../components/UI/Table/Table";
import {firestore} from "../../../../firebase";
import Edit from "./Forms/Edit/Edit";
import Add from "./Forms/Add/Add";


const headCells = [
    { id: 'first' , label: 'First Name' },
    { id: 'last' , label: 'Last Name' },
    { id: 'approved', label: 'Approved'},
    {id: 'email', label: 'Email'}
];

const Users = () => {
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [approvedVolunteers, setApprovedVolunteers] = useState([]);
    const [registeredVolunteers, setRegisteredVolunteers] = useState([]);
    const [formData, setFormData] = useState({});
    const [tableData, setTableData] = useState([]);
    const [filterSwitch, setApprovedSwitch] = useState(true);

    useEffect(() => {
        //split users into approved and not approved tables
        let AVList = [];
        let RVList = [];
        tableData.forEach(row => {
            if (row.approved === "true"){
                AVList.push(row);
            }else {
                RVList.push(row);
            }
        });
        setApprovedVolunteers(AVList);
        setRegisteredVolunteers(RVList)
    },[tableData]);

    useEffect(() => {
        reloadUsers();
        console.log("Got parts");
    },[]);

    async function getUsers() {
        let users = [];
        const usersRef = await firestore.collection('users').get();
        usersRef.forEach((user) => {
            users.push({...user.data(), id: user.id});
        });
        setTableData(users);
    }

    const reloadUsers = () => {
        getUsers().catch(error => {console.log(error)});
    };

    const handleApprovedSwitch = () => {
        setApprovedSwitch(!filterSwitch);
    };

    const onAdd = () => {
        reloadUsers();
        setAddOpen(false);
    };

    const handleAddOpen = () => {
        setAddOpen(true);
    };

    const handleAddClose = () => {
        setAddOpen(false);
    };

    //edit modal functions
    function onEdit() {
        reloadUsers();
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
    const onDelete = () => {
        reloadUsers();
        setDeleteOpen(false);
    };

    const handleDeleteOpen = (props) => {
        setFormData({...props});
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const switchLabel = filterSwitch ? "Not Approved (" + registeredVolunteers.length  + ")" : "Approved";

    return(
        <div style={{width:'90%', margin: 'auto'}}>
            <EnhancedTable
                data={filterSwitch ? approvedVolunteers : registeredVolunteers}
                headCells={headCells}
                add={handleAddOpen}
                actionEdit={handleEditOpen}
                actionDelete={handleDeleteOpen}
                approvedLabel={switchLabel}
                approvedSwitch={filterSwitch}
                handleApprovedSwitch={handleApprovedSwitch}
                actions
            />
            <TransitionModal
                open={addOpen}
                handleOpen={handleAddOpen}
                handleClose={handleAddClose}
                form={<Add onAdd={onAdd} handleClose={handleAddClose}/>}
                title={"Add User"}
            />
            <TransitionModal
                open={editOpen}
                handleOpen={handleEditOpen}
                handleClose={handleEditClose}
                form={<Edit formData={formData} onEdit={onEdit} handleClose={handleEditClose}/>}
                title={"Edit User"}
            />
        </div>
    );
};

export default Users;
