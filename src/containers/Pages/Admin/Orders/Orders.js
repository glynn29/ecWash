import React, {useEffect, useState} from "react";
import EnhancedTable from "../../../../components/UI/Table/Table";

import {firestore} from "../../../../firebase";
import DeleteForm from "../../../../components/UI/Forms/DeleteForm/DeleteForm";
import EditForm from "./Forms/EditForm/EditForm";
import TransitionModal from "../../../../components/UI/Modal/Modal";
const headCells = [
    {id:'name', label: 'Name'},
    {id:'status', label: 'Status'},
    {id:'date', label: 'Date'}
];

const statusList = [
    'new',
    'order sent',
    'billed',
    'paid'
];

const Orders = (props) => {
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [filteredTableData, setFilteredTableData] = useState([]);
    const [status, setStatus] = useState();
    const [filter, setFilter] = useState(false);
    const [filterValue, setFilterValue] = useState(null);
    const [formData, setFormData] = useState({});

    async function getOrders() {
        const orders = [];
        const ordersRef = await firestore.collection("orders").orderBy("name", "desc").get();
        ordersRef.forEach(order => {
            orders.push({...order.data(), id:order.id, status: statusList[0], date: '2020-01-16'});
        });
        const groupedOrders = orders.reduce((hash, obj) => ({...hash, [obj['name']]:( hash[obj['name']] || [] ).concat(obj)}), []);
        const arrayGrouped = Object.values(groupedOrders);
        setOrders(arrayGrouped);
        setTableData(orders);
        console.log(orders);
    }

    useEffect(() => {
        getOrders().catch(error => console.log(error));
    },[]);

    function handleSetUsers(index) {
        setUserOrders(orders[index]);
        setFilteredTableData(orders[index]);
    }

    //edit modal functions
    function onEditPart(part, id) {
        // props.onEditPart(part , id);
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
    const onDelete = (id) => {
        // props.onRemovePart(id);
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
        <div style={{textAlign: 'center'}}>
            Orders:
            {orders.map((order, index) => {
                return (<p onClick={() => handleSetUsers(index)} style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}> Name: {order[0].name} </p>);
            })}

            {userOrders.length > 0 && <div>
                {userOrders.map((order, index) => {
                    return (
                        <div>
                            <p style={{color: 'red', textDecoration: 'underline'}}>Order number: {index} </p>
                            <p>Name: {order.name}</p>
                            <ul>
                                {order.items.map(item => {
                                    return (
                                        <li key={item.id}>Name: {item.name}, Code: {item.code}, Category: {item.category}, Quantity: {item.amount}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    )})}
            </div>}
            <EnhancedTable
                data={filter ? filteredTableData : tableData}
                headCells={headCells}
                actionEdit={handleEditOpen}
                actionDelete={handleDeleteOpen}
                actions
            />
            <TransitionModal
                open={editOpen}
                handleOpen={handleEditOpen}
                handleClose={handleEditClose}
                form={<EditForm formData={formData} onEdit={onEditPart} handleClose={handleEditClose} statusList={statusList} />}
                title={"Edit Part"}
            />
            <TransitionModal
                open={deleteOpen}
                handleOpen={handleDeleteOpen}
                handleClose={handleDeleteClose}
                form={<DeleteForm formData={formData} onDelete={onDelete} cancel={handleDeleteClose} />}
                title={"Are You Sure?"}
            />
        </div>
    );
};

export default Orders;
