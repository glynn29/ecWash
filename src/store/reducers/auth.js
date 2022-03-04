import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    email: null,
    first: null,
    last: null,
    nickName: null,
    city: null,
    state: null,
    zip: null,
    address: null,
    locationPhone: null,
    managerPhone: null,
    approved: false,
    registered: false,
    error: null,
    loading: false,
};

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false
    });
};

const registerSuccess = (state, action) => {
    return updateObject(state, {
        registered: true,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        email: null,
        first: null,
        last: null,
        nickName: null,
        city: null,
        state: null,
        zip: null,
        address: null,
        locationPhone: null,
        managerPhone: null,
        approved: false,
        registered: false,
        error: null,
        loading: false,
    });
};

const getCurrentUser = (state, action) => {
    return updateObject(state, {
        email: action.email,
        first: action.first,
        last: action.last,
        nickName: action.nickName,
        city: action.city,
        state: action.state,
        zip: action.zip,
        address: action.address,
        locationPhone: action.locationPhone,
        managerPhone: action.managerPhone,
        approved: action.approved,
        registered: false,
        error: action.error,
        loading: false,
    })
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.REGISTER_SUCCESS:
            return registerSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.FETCH_CURRENT_USER:
            return getCurrentUser(state, action);
        default:
            return state;
    }
};

export default reducer;
