import React, { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import AutoComplete from "@material-ui/lab/Autocomplete";
import Spinner from "../../../../components/UI/Spinner/Spinner";

import { firestore } from "../../../../firebase";
import OrdersTable from "./OrdersTable";
import useStyles from "../../../../components/UI/Styles/formStyle";

const statusList = [
    'new',
    'delivered',
    'billed',
    'paid'
];

const Orders = () => {
    const styles= useStyles();
    const [tableData, setTableData] = useState([]);
    const [filterActive, setFilterActive] = useState(false);
    const [filterValue, setFilterValue] = useState(null);
    const [filteredTableData, setFilteredTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function getOrders() {
        const orders = [];
        setIsLoading(true);
        const ordersRef =  firestore.collection("orders")
            .orderBy("date", "desc");
        const data = await ordersRef.get();
        data.forEach(order => {
            const num = Math.floor(Math.random() * 4);
            orders.push({...order.data(), id: order.id, status: statusList[num], statusStep: num});
        });
        setTableData(orders);
        setIsLoading(false);
    }

    useEffect(() => {
        getOrders()
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (filterValue && filterActive) {
            filterOrders();
        }
    },[filterValue, filterActive]);

    const filterOrders = () => {
        let filteredOrders = tableData.filter((order) => order.name === filterValue);
        setFilteredTableData(filteredOrders);
    };

    const handleFilterSwitch =() => {
        setFilterActive(!filterActive);
    };

    if(isLoading) return <Spinner />;
    return (
        <Container>
            <div style={{display: 'flex', justifyContent: 'center'}} >
                <div className={styles.searchBar}>
                    <FormControl className={styles.searchInput}>
                        <AutoComplete
                            freeSolo
                            onChange={(event, value) => {
                                setFilterValue(value ? value.name : null);
                            }}
                            options={tableData.sort((a, b) => -b.name.charAt(0)
                                .localeCompare(a.name.charAt(0)))}
                            groupBy={(option) => option.name.charAt(0)}
                            getOptionLabel={(option) => (option.name)}
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
                    control={<Switch checked={filterActive} onChange={handleFilterSwitch} />}
                    label={filterActive ? "Disable Filter" : "Enable Filter"}
                />
            </div>
            <br />
            <Divider />
            <br />
            <OrdersTable
                filter={(filterValue && filterActive)}
                tableData={(filterValue && filterActive) ? filteredTableData : tableData}
                filteredTableData={filteredTableData} />
        </Container>
    );
};

export default Orders;
