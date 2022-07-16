import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";

import { firestore } from "../../../../firebase"
import formStyles from "../../../../components/UI/Styles/formStyle";
import * as actions from "../../../../store/actions";

const OrderHistory = (props) => {
    const styles = formStyles();
    const [orders, setOrders] = useState([]);
    const { email } = props;

    useEffect(() => {
        if (props.parts.length > 0) {
            fetchOrders()
                .then(response => {
                    setOrders(response);
                });
        }
    }, [email, props.parts]);

    useEffect(() => {
        if (props.orderComplete) {
            props.enqueueSnackbar('Order Complete', {
                variant: "success",
                autoHideDuration: 9000,
                TransitionComponent: Slide,
                anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
            });
            props.clearOrder();
        }
    }, [props.orderComplete]);

    const extractItems = (order) => {
        let items = [];
        order.items.forEach(item => {
            const partIndex = props.parts.findIndex(part => part.id === item.itemId);
            let part = { ...props.parts[partIndex], amount: item.amount };
            items.push(part);
        });
        return { ...order, items: items };
    };

    const fetchOrders = async () => {
        const ordersRef = firestore.collection("orders")
            .where("email", "==", props.email)
            .orderBy("createdAt", "desc");
        let ordersList = [];
        await ordersRef.get()
            .then((res) => {
                res.forEach(order => {
                    ordersList.push({ ...extractItems(order.data()), id: order.id });
                });
            })
            .catch((error) => console.log(error));
        return ordersList;
    };

    const handleOrderAgain = (order, event) => {
        event.stopPropagation();
        order.items.forEach(item => {
            props.onAddItem(item, item.amount);
        });
        props.enqueueSnackbar('Items added to your cart successfully', {
            variant: "success",
            autoHideDuration: 3000,
            TransitionComponent: Slide,
            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
        });
    };

    const ordersView = (
        orders.map((order, index) =>
                       <div key={order.id} style={{ margin: '8px 0' }}>
                           <Accordion style={{ alignContent: 'center' }}>
                               <AccordionSummary
                                   expandIcon={<ExpandMoreIcon />}
                               >
                                   <div style={{
                                       justifyContent: 'space-between',
                                       width: '100%',
                                       display: 'flex'
                                   }}>
                                       <Typography style={{ alignSelf: 'center' }}>
                                           Order #{index + 1}: {order.date}
                                       </Typography>
                                       <Button onClick={(event) => {
                                           handleOrderAgain(order, event);
                                       }}>
                                           Order Again
                                       </Button>
                                   </div>
                               </AccordionSummary>
                               <AccordionDetails>
                                   <Grid container>
                                       {order.items.map(
                                           item => <Grid item xs={12} sm={6} md={4} key={item.id}>{item.name}
                                               <span style={{ fontWeight: 'bold' }}> X </span>{item.amount}</Grid>
                                       )}
                                   </Grid>
                               </AccordionDetails>
                           </Accordion>
                       </div>
        )
    );

    const noOrdersView = (
        <Typography>No Orders</Typography>
    );

    return (
        <Container className={styles.container}>
            {orders.length < 1 ? noOrdersView : ordersView}
        </Container>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onAddItem: (item, amount) => dispatch(actions.onAddItem(item, amount)),
        clearOrder: () => dispatch(actions.clearOrder()),
    }
};

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        orderComplete: state.cart.orderComplete,
        parts: state.parts.parts,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(OrderHistory));
