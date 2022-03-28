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

    useEffect(() => {
        const ordersRef = firestore.collection("orders")
            .where("email", "==", props.email)
            .orderBy("date", "desc")
            .orderBy("time", "desc");
        ordersRef.get()
            .then((res) => {
                let ordersList = [];
                res.forEach(order => {
                    ordersList.push({...order.data(), id: order.id});
                });
                setOrders(ordersList);
            })
            .catch();
    }, [props.email]);

    const handleOrderAgain = (order, event) => {
        event.stopPropagation();
        order.items.forEach(item => {
            props.onAddItem(item, item.amount);
        });
        props.enqueueSnackbar('Items added to your cart successfully', {
            variant: "success",
            autoHideDuration: 3000,
            TransitionComponent: Slide,
            anchorOrigin: {vertical: 'bottom', horizontal: 'right'}
        });
    };

    return (
        <Container className={styles.Container}>
            {orders.map((order, index) =>
                               <div key={order.id} style={{margin: '8px 0'}}>
                                   <Accordion style={{alignContent: 'center'}}>
                                       <AccordionSummary
                                           expandIcon={<ExpandMoreIcon/>}
                                       >
                                           <div style={{
                                               justifyContent: 'space-between',
                                               width: '100%',
                                               display: 'flex'
                                           }}>
                                               <Typography
                                                   style={{alignSelf: 'center'}}>Order
                                                   #{index + 1}: {order.date}</Typography>
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
                                                   item => <Grid item xs={12} sm={6} md={4} key={item.name}>{item.name}
                                                       <span style={{fontWeight: 'bold'}}>X</span> {item.amount}</Grid>
                                               )}
                                           </Grid>
                                       </AccordionDetails>
                                   </Accordion>
                               </div>
                )
            }
        </Container>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onAddItem: (item, amount) => dispatch(actions.onAddItem(item, amount)),
    }
};

const mapStateToProps = state => {
    return {
        email: state.auth.email,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(OrderHistory));
