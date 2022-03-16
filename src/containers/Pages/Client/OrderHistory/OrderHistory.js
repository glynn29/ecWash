import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Container from "@material-ui/core/Container";

import useFetch from "../../../../apiCalls/useFetch";
import Grid from "@material-ui/core/Grid";

import { firestore } from "../../../../firebase"
import Item from "../../Admin/Orders/Forms/Item";
import formStyles from "../../../../components/UI/Styles/formStyle";

const OrderHistory = (props) => {
    const styles = formStyles();
    // const [result, isLoading] = useFetch(ordersRef);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const ordersRef = firestore.collection("orders")
            .where("email", "==", props.email)
            .orderBy("date", "desc")
            .orderBy("time", "desc");
        ordersRef.get()
            .then((res) => {
                let ordersList = [];
                res.forEach(order => {
                    console.log(order.data());
                    ordersList.push({...order.data(), id: order.id});
                });
                setOrders(ordersList);
            })
            .catch();
    }, [props.email]);

    return (
        <Container className={styles.Container}>
            {/*//TODO get only order for that user, Create item card for display*/}
            Still under construction...
            <ol>
                <Container style={{maxHeight: '40em', overflow: 'auto'}}>
                    {orders.map(order => <li key={order.id}><Grid container spacing={2}>{order.items.map(
                        item => <Grid item xs={12} key={item.id}><Item item={item}/></Grid>)}<br/></Grid></li>)}
                </Container>
            </ol>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        email: state.auth.email,
    };
};

export default connect(mapStateToProps)(OrderHistory);
