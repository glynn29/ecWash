import React, { Fragment, useEffect, useState } from "react";

import EnhancedTable from "../../../../components/UI/Table/Table";
import CustomTabs from "../../../../components/UI/Tabs/Tabs";
import DeleteForm from "../../../../components/UI/Forms/DeleteForm/DeleteForm";
import EditForm from "./Forms/EditForm/EditForm";
import TransitionModal from "../../../../components/UI/Modal/Modal";

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

const OrdersTable = (props) => {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [tabTableData, setTabTableData] = useState([]);
    const [tabValue, setTabValue] = useState('All');
    const [formData, setFormData] = useState({});
    const [labelList, setLabelList] = useState([]);

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

    //table navigation functions
    const handleTabChange = (index) => {
        setTabValue(statusList[index - 1]);
    };

    const setLabelCountHandler = () => {
        let tempLabelList = ['All'];
        statusList.forEach((elm, i) => {
            const labelCount = props.tableData.filter(row => row.status === elm).length;
            tempLabelList.push(statusList[i] + ' (' + labelCount + ')');
        });
        setLabelList(tempLabelList);
    };

    const filterTabData = () => {
        const tempData = props.tableData.filter(row => row.status === tabValue);
        setTabTableData(tempData);
    };

    useEffect(() => {
        if (tabValue) {
            filterTabData();
        }
    }, [props.tableData, tabValue]);

    useEffect(() => {
        setLabelCountHandler();
    },[props.tableData]);

    const straightCorners = {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    };

    const comp1 = (<EnhancedTable
        data={props.tableData}
        headCells={headCells}
        actionEdit={handleEditOpen}
        actionDelete={handleDeleteOpen}
        straightCorners={straightCorners}
        actions
    />);
    const comp2 = (<EnhancedTable
        data={tabTableData}
        headCells={headCells}
        actionEdit={handleEditOpen}
        actionDelete={handleDeleteOpen}
        straightCorners={straightCorners}
        actions
    />);
    const comp3 = (<EnhancedTable
        data={tabTableData}
        headCells={headCells}
        actionEdit={handleEditOpen}
        actionDelete={handleDeleteOpen}
        straightCorners={straightCorners}
        actions
    />);
    const comp4 = (<EnhancedTable
        data={tabTableData}
        headCells={headCells}
        actionEdit={handleEditOpen}
        actionDelete={handleDeleteOpen}
        straightCorners={straightCorners}
        actions
    />);
    const comp5 = (<EnhancedTable
        data={tabTableData}
        headCells={headCells}
        actionEdit={handleEditOpen}
        actionDelete={handleDeleteOpen}
        straightCorners={straightCorners}
        actions
    />);

    const componentList = [comp1, comp2, comp3, comp4, comp5];

    return (
        <Fragment>
            <CustomTabs tabLabelList={labelList} componentsList={componentList} handleTabChange={handleTabChange}/>
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
        </Fragment>
    );
};

export default OrdersTable;
