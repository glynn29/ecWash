import React, {useEffect, useState} from "react";
import EnhancedTable from "../../../components/UI/Table/Table";

import {firestore} from "../../../firebase";

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
    const [orders, setOrders] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [filteredTableData, setFilteredTableData] = useState([]);
    const [status, setStatus] = useState();
    const [filter, setFilter] = useState(false);

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
                actions
            />
        </div>
    );
};

export default Orders;
