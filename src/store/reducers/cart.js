import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const testList = [
    {
        "pictures": [
            {
                "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/parts%2Fi9dkfVg8ax9X7i8hYagk%2FBU2HEI8k7xf7HdBucPPo%2FIMG_0183?alt=media&token=0f5aa6cd-edcf-4448-87e6-f64c25fed7d1",
                "pictureName": "IMG_01870"
            }
        ],
        "name": "BEARING: 1 1/4in  - Tapped Base Bearing",
        "categoryId": "jg88e8De7Lyy4oHr22vI",
        "details": "Tire shine brush bearing",
        "createdAt": {
            "seconds": 1651551006,
            "nanoseconds": 479000000
        },
        "amount": 1,
        "updatedAt": {
            "seconds": 1651551006,
            "nanoseconds": 479000000
        },
        "id": "g4J7GkH1nVwTNqthUDYY"
    },
    {
        "createdAt": {
            "seconds": 1651551006,
            "nanoseconds": 556000000
        },
        "updatedAt": {
            "seconds": 1651551006,
            "nanoseconds": 556000000
        },
        "amount": 1,
        "pictures": [
            {
                "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/parts%2Fi9dkfVg8ax9X7i8hYagk%2FBU2HEI8k7xf7HdBucPPo%2FIMG_0183?alt=media&token=0f5aa6cd-edcf-4448-87e6-f64c25fed7d1",
                "pictureName": "IMG_0183"
            }
        ],
        "details": "Drive shaft bearing at the end of the tunnel",
        "name": "BEARING: 2 15/16in  - Drive Shaft Bearing",
        "categoryId": "jg88e8De7Lyy4oHr22vI",
        "id": "u2NaU2rOBckPFMWIDZqW"
    },
    {
        "updatedAt": {
            "seconds": 1651551006,
            "nanoseconds": 638000000
        },
        "categoryId": "jg88e8De7Lyy4oHr22vI",
        "amount": 1,
        "pictures": [
            {
                "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/parts%2Fi9dkfVg8ax9X7i8hYagk%2FBU2HEI8k7xf7HdBucPPo%2FIMG_0183?alt=media&token=0f5aa6cd-edcf-4448-87e6-f64c25fed7d1",
                "pictureName": "IMG_0182"
            }
        ],
        "details": "Drive shaft bearing at end of tunnel, IP69K is maintenance free bearing",
        "name": "BEARING: 2 15/16in  - IP69K Drive Shaft Bearing",
        "createdAt": {
            "seconds": 1651551006,
            "nanoseconds": 638000000
        },
        "id": "RxGJWXGniYXcfxAKsaUz"
    },
    {
        "createdAt": {
            "seconds": 1651551006,
            "nanoseconds": 995000000
        },
        "updatedAt": {
            "seconds": 1651551006,
            "nanoseconds": 995000000
        },
        "details": "Take up drum and wrap arm bearing",
        "amount": 1,
        "categoryId": "jg88e8De7Lyy4oHr22vI",
        "pictures": [
            {
                "pictureName": "IMG_0185",
                "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/parts%2Fi9dkfVg8ax9X7i8hYagk%2FBU2HEI8k7xf7HdBucPPo%2FIMG_0183?alt=media&token=0f5aa6cd-edcf-4448-87e6-f64c25fed7d1"
            }
        ],
        "name": "BEARING: 2in  - Pillow Block Bearing",
        "id": "HEPcOPJ0kJUBfTbOsUmy"
    }
];
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
