import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    items: [],
    removed: false,
    added: false,
    orderComplete: false
};

const fetchItems = (state, action) => {
    return updateObject(state, {
        items: action.items,
    });
};

const addItem = (state, action) => {
    const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    const existingCartItem = state.items[existingItemIndex];
    let updatedItems;
    if (existingCartItem){
        const updatedItem = {...existingCartItem, amount: existingCartItem.amount + action.amount};
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
    } else {
        updatedItems = state.items.concat({...action.item, amount: action.amount});
    }

    return updateObject( state, {
        items: updatedItems,
        added: true
    });
};

const removeItem = (state, action) => {
    const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    if (existingItem === undefined)
        return state;

    let updatedItems;
    if (existingItem.amount === 1){
        updatedItems = state.items.filter((item) => action.id !== item.id);
    } else {
        const updateItem = {...existingItem, amount: existingItem.amount -1};
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updateItem;
    }

    return updateObject( state, {
        items: updatedItems,
        removed: true
    });
};

const clearItems = (state) => {
    return updateObject(state, {
        items: [],
    });
};

const orderComplete = (state) => {
    return updateObject(state, {
        orderComplete: true
    })
};


const clearOrder = (state) => {
    return updateObject(state, {
        orderComplete: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ITEMS:
            return fetchItems(state, action);
        case actionTypes.ADD_ITEM:
            return addItem(state, action);
        case actionTypes.REMOVE_ITEM:
            return removeItem(state, action);
        case actionTypes.CLEAR_ITEMS:
            return clearItems(state, action);
        case actionTypes.ORDER_COMPLETE:
            return orderComplete(state, action);
        case actionTypes.CLEAR_ORDER:
            return clearOrder(state, action);
        default:
            return state;
    }
};

export default reducer;
