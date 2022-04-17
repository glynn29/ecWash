import React from "react";
import { connect } from "react-redux";

import Container from "@material-ui/core/Container";

import AddToCartCard from "../../../../containers/Pages/Client/Shopping/Cards/AddToCartCard/AddToCartCard";
import * as actions from "../../../../store/actions";
import TransitionModal from "../../Modal/Modal";
import formStyles from "../../Styles/formStyle";

const SearchModal = ({open, close, item, onAddItem}) => {
    const styles = formStyles();

    const form = (
        <Container component="main" maxWidth="sm" className={styles.container}>
            <AddToCartCard item={item && item} close={close} onAddItem={onAddItem}/>
        </Container>
    );

    return (
        <TransitionModal
            open={open}
            handleClose={close}
            form={form}
            title={item && item.name}
        />
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onAddItem: (item, amount) => dispatch(actions.onAddItem(item, amount)),
    }
};

export default connect(null, mapDispatchToProps)(SearchModal);
