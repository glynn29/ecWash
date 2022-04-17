import React, { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import AutoComplete from "@material-ui/lab/Autocomplete";
import Skeleton from "@material-ui/lab/Skeleton";

import { firestore } from "../../../../firebase";
import OrdersTable from "./OrdersTable";
import useStyles from "../../../../components/UI/Styles/formStyle";
import useFetch from "../../../../apiCalls/useFetch";

const statusList = [
    'new',
    'sold',
    'delivered',
    'invoiced'
];

const Orders = () => {
    const styles = useStyles();
    const [tableData, setTableData] = useState([]);
    const [filterActive, setFilterActive] = useState(false);
    const [filterValue, setFilterValue] = useState(null);
    const [filteredTableData, setFilteredTableData] = useState([]);

    //TODO order by time
    const ordersRef = firestore.collection("orders")
        .orderBy("date", "desc")
        .orderBy("time", "desc");
    const [result, isLoading] = useFetch(ordersRef);

    useEffect(() => {
        setTableData(result);
    }, [result]);

    useEffect(() => {
        if (filterValue && filterActive) {
            filterOrders();
        }
    }, [filterValue, filterActive, tableData]);

    const filterOrders = () => {
        let filteredOrders = tableData.filter((order) => order.nickName === filterValue);
        setFilteredTableData(filteredOrders);
    };

    const handleFilterSwitch = () => {
        setFilterActive(!filterActive);
    };

    const onEdit = (order, id) => {
        const tempOrder = {...order};
        delete tempOrder.id;
        firestore.collection("orders")
            .doc(id)
            .set(tempOrder, {merge: true})
            .then(() => {
                let tempTableData = [...tableData];
                const index = tableData.findIndex((row) => row.id === id);
                tempTableData[index] = order;
                setTableData(tempTableData);
            })
            .catch(error => {
                console.log(error)
            });
    };

    const onDelete = (id) => {
        firestore.collection("orders")
            .doc(id)
            .delete()
            .then(() => {
                let tempTableData = tableData.filter((row) => row.id !== id);
                setTableData(tempTableData);
            })
            .catch(error => {
                console.log(error)
            });
    };

    if (isLoading) {
        return (
            <Container>
                <Skeleton animation={"wave"} variant={"rect"} width={'100%'} height={400}/>
            </Container>
        );
    }

    return (
        <Container>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className={styles.searchBar}>
                    <FormControl className={styles.searchInput}>
                        <AutoComplete
                            freeSolo
                            onChange={(event, value) => {
                                setFilterValue(value);
                            }}
                            options={Array.from(new Set(tableData.sort((a, b) => -b.nickName.charAt(0)
                                .localeCompare(a.nickName.charAt(0)))
                                                            .map(row => row.nickName)))}
                            groupBy={(option) => option.charAt(0)}
                            getOptionLabel={(option) => (option)}
                            renderInput={(params) => (
                                <TextField {...params} key={params} variant="outlined" placeholder="Filter By NickName"/>
                            )}
                        />
                    </FormControl>
                </div>
                <p style={{padding: 10}}/>
                <FormControlLabel
                    disabled={filterValue === null}
                    style={{float: 'right'}}
                    control={<Switch checked={filterActive} onChange={handleFilterSwitch}/>}
                    label={filterActive ? "Disable Filter" : "Enable Filter"}
                />
            </div>
            <br/>
            <Divider/>
            <br/>
            <OrdersTable
                tableData={(filterValue && filterActive) ? filteredTableData : tableData}
                statusList={statusList}
                onEdit={onEdit}
                onDelete={onDelete}/>
        </Container>
    );
};

export default Orders;
