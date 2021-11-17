import React, { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import AutoComplete from "@material-ui/lab/Autocomplete";

import { firestore } from "../../../../firebase";
import EnhancedTable from "../../../../components/UI/Table/Table";
import CustomTabs from "../../../../components/UI/Tabs/Tabs";
import DeleteForm from "../../../../components/UI/Forms/DeleteForm/DeleteForm";
import EditForm from "./Forms/EditForm/EditForm";
import TransitionModal from "../../../../components/UI/Modal/Modal";
import useStyles from "../../../../components/UI/Styles/formStyle";

const headCells = [
    {id: 'date', label: 'Date'},
    {id: 'name', label: 'Name'},
    {id: 'status', label: 'Status'},
];

const statusList = [
    'new',
    'delivered',
    'billed',
    'paid'
];

const Orders = (props) => {
    const styles = useStyles();
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [orders, setOrders] = useState(null);
    const [userOrders, setUserOrders] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [tabTableData, setTabTableData] = useState([]);
    const [tabValue, setTabValue] = useState('All');
    const [formData, setFormData] = useState({});
    const [labelCount, setLabelCount] = useState([]);
    const [labelList, setLabelList] = useState([]);
    const [status, setStatus] = useState();
    const [filterActive, setFilterActive] = useState(false);
    const [filterValue, setFilterValue] = useState(null);
    const [filteredTableData, setFilteredTableData] = useState(null);
    const [filteredTabTableData, setFilteredTabTableData] = useState([]);

    async function getOrders() {
        const orders = [];
        const ordersRef = await firestore.collection("orders")
            .orderBy("date", "desc")
            .get();
        ordersRef.forEach(order => {
            const num = Math.floor(Math.random() * 4);
            orders.push({...order.data(), id: order.id, status: statusList[num], statusStep: num});
        });
        setOrders(orders);
        setTableData(orders);
        setLabelCountHandler(orders);
        console.log(orders);
    }

    const setLabelCountHandler = (data) => {
        const tempLabels = [
            'New ',
            'Delivered ',
            'Billed ',
            'Paid '
        ];
        let tempLabelCount = [];
        statusList.forEach(elm => {
            const label = data.filter(row => row.status === elm);
            tempLabelCount.push(label.length);
        });
        let tempLabelList = ['All'];
        for (let i = 0; i < 4; i++) {
            tempLabelList.push(tempLabels[i] + '(' + tempLabelCount[i] + ')');
        }
        setLabelList(tempLabelList);
    };

    useEffect(() => {
        getOrders()
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (filterValue && filterActive) {
            filterOrders();
        }
    },[filterValue, filterActive]);

    useEffect(() => {
        if (tabValue) {
            filterTabData();
        }
    }, [tabValue]);

    useEffect(() => {
        if (filteredTableData && filterActive) {
            console.log("filtering baby cakes");
            setLabelCountHandler(filteredTableData);
        } else if (orders){
            setLabelCountHandler(orders);
        }
    }, [filteredTableData, filterActive]);

    const filterOrders = () => {
        let filteredOrders = orders.filter((order) => order.name === filterValue);
        console.table(filteredOrders);
        setFilteredTableData(filteredOrders);
    };

    const filterTabData = () => {
        if (filteredTableData && filterActive) {
            const tempTabTableDataToFilter = filteredTableData.filter(row => row.status === tabValue);
            console.log(tempTabTableDataToFilter);
            setFilteredTabTableData(tempTabTableDataToFilter);
        }
        const tempData = tableData.filter(row => row.status === tabValue);
        setTabTableData(tempData);
    };

    const handleTabChange = (index) => {
        setTabValue(statusList[index - 1]);
    };

    const handleFilterSwitch =() => {
        setFilterActive(!filterActive);
    };

    function handleSetUsers(index) {
        setUserOrders(orders[index]);
        setTabTableData(orders[index]);
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

    const comp1 = (<EnhancedTable
        data={(filteredTableData && filterActive) ? filteredTableData : tableData}
        headCells={headCells}
        actionEdit={handleEditOpen}
        actionDelete={handleDeleteOpen}
        actions
    />);
    const comp2 = (<EnhancedTable
        data={(filteredTableData && filterActive) ? filteredTabTableData : tabTableData}
        headCells={headCells}
        actionEdit={handleEditOpen}
        actionDelete={handleDeleteOpen}
        actions
    />);
    const comp3 = (<EnhancedTable
        data={(filteredTableData && filterActive) ? filteredTabTableData : tabTableData}
        headCells={headCells}
        actionEdit={handleEditOpen}
        actionDelete={handleDeleteOpen}
        actions
    />);
    const comp4 = (<EnhancedTable
        data={(filteredTableData && filterActive) ? filteredTabTableData : tabTableData}
        headCells={headCells}
        actionEdit={handleEditOpen}
        actionDelete={handleDeleteOpen}
        actions
    />);
    const comp5 = (<EnhancedTable
        data={(filteredTableData && filterActive) ? filteredTabTableData : tabTableData}
        headCells={headCells}
        actionEdit={handleEditOpen}
        actionDelete={handleDeleteOpen}
        actions
    />);

    const componentList = [comp1, comp2, comp3, comp4, comp5];

    // const labelList = [
    //     'All',
    //     'New',
    //     'Order sent',
    //     'Billed',
    //     'Paid'
    // ];



    return (
        <Container>
            <div style={{display: 'flex', justifyContent: 'center'}} >
                {orders &&<div className={styles.searchBar}>
                    <FormControl className={styles.searchInput}>
                        <AutoComplete
                            freeSolo
                            onChange={(event, value) => {
                                if (value) {
                                    setFilterValue(value.name);
                                } else {
                                    setFilterValue(null);
                                }
                            }}
                            options={orders.sort((a, b) => -b.name.charAt(0)
                                .localeCompare(a.name.charAt(0)))}
                            groupBy={(option) => option.name.charAt(0)}
                            getOptionLabel={(option) => (option.name)}
                            renderInput={(params) => (
                                <TextField {...params} key={params} variant="outlined" placeholder="Filter Order"/>
                            )}
                        />
                    </FormControl>
                </div>}
                <p style={{padding: 10}}/>
                <FormControlLabel
                    disabled={filterValue === null}
                    style={{float: 'right'}}
                    control={<Switch checked={filterActive} onChange={handleFilterSwitch} />}
                    label={filterActive ? "Disable Filter" : "Enable Filter"}
                />
            </div>
            <br />
            <Divider />
            <br />
            <CustomTabs tabLabelList={labelList} componentsList={componentList} handleTabChange={handleTabChange}/>
            {/*//TODO filter by nickname*/}
            <TransitionModal
                open={editOpen}
                handleOpen={handleEditOpen}
                handleClose={handleEditClose}
                form={<EditForm formData={formData} onEdit={onEditPart} statusList={statusList}/>}
                title={"Edit Order"}
            />
            <TransitionModal
                open={deleteOpen}
                handleOpen={handleDeleteOpen}
                handleClose={handleDeleteClose}
                form={<DeleteForm formData={formData} onDelete={onDelete} title={"Delete this order?"}
                                  buttonText={"Delete Order"}/>}
                title={"Are You Sure?"}
            />
        </Container>
    );
};

export default Orders;
