import * as actionTypes from './actionTypes';

export const fetchItems = () => {
    return {
        type: actionTypes.FETCH_ITEMS
    };
};

export const addItem = (item, amount) => {
    return {
        type: actionTypes.ADD_ITEM,
        item: item,
        amount: amount
    };
};

export const removeItem = (id) => {
    return {
        type: actionTypes.REMOVE_ITEM,
        id: id
    };
};

export const onAddItem = (item, amount) => {
    return dispatch =>{
        dispatch(addItem(item, amount));
    }
};

export const onRemoveItem = (id) => {
    return dispatch =>{
        dispatch(removeItem(id));
    }
};

export const clearItems = () => {
    return {
        type: actionTypes.CLEAR_ITEMS
    }
};
