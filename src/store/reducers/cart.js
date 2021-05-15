import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    items: [],
    total: 0,
};

const fetchItems = (state, action) => {
    return updateObject(state, {
        items: action.items,
        total: action.total,
    });
};

const addItem = (state, action) => {
    const updatedTotalAmount = state.total + action.item.price * action.item.amount;
    const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    const existingCartItem = state.items[existingItemIndex];
    let updatedItems;
    if (existingCartItem){
        const updatedItem = {...existingCartItem, amount: existingCartItem.amount + action.item.amount};
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
    } else {
        updatedItems = state.items.concat(action.item);
    }

    return updateObject( state, {
        items: updatedItems,
        total: updatedTotalAmount
    });
};

const removeItem = (state, action) => {
    const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    let updatedItems;
    if (existingItem.amount === 1){
        updatedItems = state.items.filter((item) => action.id !== item.id);
    } else {
        const updateItem = {...existingItem, amount: existingItem.amount -1};
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updateItem;
    }

    const updatedTotalAmount = state.total - existingItem.price;
    return updateObject( state, {
        items: updatedItems,
        total: updatedTotalAmount,
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ITEMS:
            return fetchItems(state, action);
        case actionTypes.ADD_ITEM:
            return addItem(state, action);
        case actionTypes.REMOVE_ITEM:
            return removeItem(state, action);
        default:
            return state;
    }
};

export default reducer;
