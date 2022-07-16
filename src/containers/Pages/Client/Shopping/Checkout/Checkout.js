import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import useStyles from "../../../../../components/UI/Styles/formStyle";
import { firestore, getTimestamp } from "../../../../../firebase";
import cartClasses from "../../../../../components/Cart/Cart.module.css";
import CartItem from "../../../../../components/Cart/CartItem/CartItem";
import Spinner from "../../../../../components/UI/Spinner/Spinner";
import * as actions from "../../../../../store/actions";
import * as classes from './Checkout.module.css';
import { AuthContext } from "../../../../Auth/Auth";
import alt_image from "../../../../../assets/images/alt_image.jpg";
import { Bubble } from "./Bubble";

const Checkout = (props) => {
    const {items, email, nickName} = props;
    const {isAdmin} = useContext(AuthContext);
    const styles = useStyles();
    const history = useHistory();
    const [name, setName] = useState(props.managerFirst + " " + props.managerLast);
    const [phoneNumber, setPhoneNumber] = useState(props.locationPhone);
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [customerIndex, setCustomerIndexIndex] = useState("");

    const cartItems = <ul className={`${cartClasses.CartItems} ${cartClasses.CheckOutHeight}`}>{items
        .map((item) => (
            <CartItem
                pictureUrl={item.pictures.length > 0 ? item.pictures[0].pictureUrl : alt_image}
                key={item.id}
                amount={item.amount}
                name={item.name}
                isLoading={isLoading}
                onAdd={() => props.onAddItem(item, 1)}
                onRemove={() => props.onRemoveItem(item.id)}
            />
        ))}</ul>;

    useEffect(() => {
        if (items.length < 1) {
            history.push('/shopping'); //TODO disable for testing
        }
    }, []);

    const submitOrderHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let adminEmail = "";
        let adminNickName = "";
        if (isAdmin) {
            const customer = props.users[customerIndex];
            adminEmail = customer.email;
            adminNickName = customer.nickName;
        }

        let cleanedItems = [];
        items.forEach(item => {
            let cleanedItem = {
                itemId: item.id,
                amount: item.amount
            };
            cleanedItems.push(cleanedItem)
        });
        const timestamp = getTimestamp();

        firestore.collection("orders")
            .add({
                     status: 'new',
                     statusStep: 1,
                     createdAt: timestamp,
                     updatedAt: timestamp,
                     nickName: isAdmin ? adminNickName : nickName,
                     email: isAdmin ? adminEmail : email,
                     comment,
                     items: cleanedItems
                 }
            )
            .then(() => {
                const timeoutLength = (Math.random() * 700) + 300;
                setTimeout(function () {
                    props.orderComplete();
                    props.clearItems();
                    if (isAdmin) {
                        history.replace('/orders');
                    } else {
                        history.replace('/orderhistory');
                    }
                }, timeoutLength);
            })
            .catch(error => console.log(error));
    };

    const customerForm = (
        <Container>
            <form onSubmit={submitOrderHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            value={name}
                            onChange={event => setName(event.target.value)}
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Customer Name"
                            autoFocus
                            inputProps={{maxLength: 63}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={phoneNumber}
                            onChange={event => setPhoneNumber(event.target.value)}
                            variant="outlined"
                            required
                            fullWidth
                            id="phoneNumber"
                            label="Customer Phone Number"
                            inputProps={{maxLength: 10}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            value={comment}
                            onChange={event => setComment(event.target.value)}
                            id="outlined-textarea"
                            label="Comments"
                            multiline
                            variant="outlined"
                            fullWidth
                            minRows={4}
                            inputProps={{className: styles.textarea, maxLength: 1024}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            startIcon={<CheckCircleOutlineIcon />}
                            type={"submit"}
                            variant={"contained"}
                            className={`${styles.editButton} ${styles.submit}`}
                            disabled={items.length < 1}>
                            Order
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );

    const adminForm = (
        <Container>
            <form onSubmit={submitOrderHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={styles.formControl} required>
                            <InputLabel>Customer</InputLabel>
                            <Select
                                native
                                value={customerIndex}
                                onChange={event => setCustomerIndexIndex(event.target.value)}
                                label="Customer"
                            >
                                <option value="" />
                                {props.users.map((listItem, index) => {
                                    return (
                                        <option key={listItem.nickName} value={index}>{listItem.nickName}</option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            value={comment}
                            onChange={event => setComment(event.target.value)}
                            id="outlined-textarea"
                            label="Comments"
                            multiline
                            variant="outlined"
                            fullWidth
                            minRows={4}
                            inputProps={{className: styles.textarea, maxLength: 1024}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            startIcon={<CheckCircleOutlineIcon />}
                            type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                            className={styles.submit}
                            disabled={items.length < 1}>
                            Order
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );

    return (
        <Container className={styles.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card className={classes.Card}>

                        <Typography variant={"h5"} className={classes.Title}>
                            <Bubble left={1} size={18}/>
                            <Bubble left={90} size={20}/>
                            <Bubble left={2} />
                            <Bubble left={90} top={33} />
                            <ShoppingCartIcon />
                            Order Summary
                        </Typography>

                        <Container>
                            {cartItems}
                        </Container>
                        <br />
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className={classes.Card}>
                        <Typography variant={"h5"} className={classes.Title}>
                            <Bubble left={2} size={30}/>
                            <Bubble left={80} />
                            <PersonIcon />
                            Customer Information
                        </Typography>
                        <br />
                        {isLoading ? <Spinner /> : (isAdmin ? adminForm : customerForm)}
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        items: state.cart.items,
        email: state.auth.email,
        managerFirst: state.auth.first,
        managerLast: state.auth.last,
        nickName: state.auth.nickName,
        locationPhone: state.auth.locationPhone,
        users: state.users.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddItem: (item, amount) => dispatch(actions.onAddItem(item, amount)),
        onRemoveItem: (id) => dispatch(actions.onRemoveItem(id)),
        clearItems: () => dispatch(actions.clearItems()),
        orderComplete: () => dispatch(actions.orderComplete())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
