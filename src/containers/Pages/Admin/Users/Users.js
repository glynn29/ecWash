import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Container from "@material-ui/core/Container";

import TransitionModal from "../../../../components/UI/Modal/Modal";
import EnhancedTable from "../../../../components/UI/Table/Table";
import Edit from "./Forms/Edit/Edit";
import Add from "./Forms/Add/Add";
import DeleteForm from "../../../../components/UI/Forms/DeleteForm/DeleteForm";
import * as actions from "../../../../store/actions";
import { functions } from "../../../../firebase";

const headCells = [
    { id: 'first', label: 'First Name' },
    { id: 'last', label: 'Last Name' },
    { id: 'approved', label: 'Approved' },
    { id: 'email', label: 'Email' }
];

const Users = (props) => {
    const { users } = props;
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [approvedVolunteers, setApprovedVolunteers] = useState([]);
    const [registeredVolunteers, setRegisteredVolunteers] = useState([]);
    const [formData, setFormData] = useState({});
    const [tableData, setTableData] = useState([]);
    const [filterSwitch, setApprovedSwitch] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //split users into approved and not approved tables
        let AVList = [];
        let RVList = [];
        tableData.forEach(row => {
            if (row.approved === "true") {
                AVList.push(row);
            } else {
                RVList.push(row);
            }
        });
        setApprovedVolunteers(AVList);
        setRegisteredVolunteers(RVList)
    }, [tableData]);

    useEffect(() => {
        setTableData(users);
    }, [users]);

    const handleApprovedSwitch = () => {
        setApprovedSwitch(!filterSwitch);
    };

    const onAdd = (formData, isAdmin) => {
        //todo doesnt create user
        const createNewUser = functions.httpsCallable('createNewUser');
        createNewUser({ email: formData.email, password: formData.password, isAdmin: isAdmin })
            .then(() => {
                const userData = {
                    first: formData.first,
                    last: formData.last,
                    email: formData.email,
                    city: formData.city,
                    state: formData.state,
                    zip: formData.zip,
                    address: formData.address,
                    locationPhone: formData.locationPhone,
                    managerPhone: formData.managerPhone,
                    nickName: formData.nickName,
                    approved: 'true',
                }
                console.log(userData);
                props.onAddUser(userData);
                setAddOpen(false);
            }).catch(error => {
                console.log(error);
                setAddOpen(false);
        });
    };

    const handleAddOpen = () => {
        setAddOpen(true);
    };

    const handleAddClose = () => {
        setAddOpen(false);
    };

    //edit modal functions
    function onEdit(formData, id) {
        props.onEditUser(formData, id);
        handleEditClose();
    }

    const handleEditOpen = (props) => {
        setFormData({ ...props });
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    //delete modal functions
    const onDelete = (id) => {
        setLoading(true);
        const deleteUser = functions.httpsCallable('deleteUser');
        deleteUser({ email: id })
            .then(() => {
                props.onRemoveUser(id);
                setDeleteOpen(false);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    };

    const handleDeleteOpen = (props) => {
        setFormData({ ...props });
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const switchLabel = filterSwitch ? "Not Approved (" + registeredVolunteers.length + ")" : "Approved";

    return (
        <Container>
            <EnhancedTable
                data={filterSwitch ? approvedVolunteers : registeredVolunteers}
                headCells={headCells}
                add={handleAddOpen}
                addDisabled={false}
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
                form={<Add onAdd={onAdd} handleClose={handleAddClose} />}
                title={"Add User"}
            />
            <TransitionModal
                open={editOpen}
                handleOpen={handleEditOpen}
                handleClose={handleEditClose}
                form={<Edit formData={formData} onEdit={onEdit} handleClose={handleEditClose} />}
                title={"Edit User"}
            />
            <TransitionModal
                open={deleteOpen}
                handleOpen={handleDeleteOpen}
                handleClose={handleDeleteClose}
                form={<DeleteForm formData={formData} onDelete={onDelete} handleClose={handleDeleteClose}
                                  title={"Delete User"} buttonText={"Delete User"} loading={loading} />}
                title={"Delete User"}
            />
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        users: state.users.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: () => dispatch(actions.onFetchUsers()),
        onRegister: (registerData, isAdmin) => dispatch(actions.register(registerData, isAdmin)),
        onAddUser: (registerData) => dispatch(actions.onAddUser(registerData)),
        onEditUser: (user, id) => dispatch(actions.onEditUser(user, id)),
        onRemoveUser: (id) => dispatch(actions.onRemoveUser(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
