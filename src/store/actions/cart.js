import * as actionTypes from './actionTypes';

export const fetchItems = () => {
    return{
        type: actionTypes.FETCH_ITEMS
    };
};

export const addItem = (item) => {
    return {
        type: actionTypes.ADD_ITEM,
        item: item
    };
};

export const removeItem = (id) => {
    return{
        type: actionTypes.REMOVE_ITEM,
        id: id
    };
};

export const onAddItem = (item) => {
    return dispatch =>{
        dispatch(addItem(item));
    }
};

export const onRemoveItem = (id) => {
    return dispatch =>{
        dispatch(removeItem(id));
    }
};
