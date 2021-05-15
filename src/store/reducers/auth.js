import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    email: null,
    userId: null,
    userDocId: null,
    name: null,
    role: null,
    events: [],
    error: null,
    loading: false,
    registered: false,
    approved: false,
    language: null,
    positions: []
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
        userId: null,
        userDocId: null,
        name: null,
        role: null,
        events: [],
        error: null,
        loading: false,
        approved: false,
        language: null,
        positions: []
    });
};

const getCurrentUser = (state, action) => {
    return updateObject(state, {
        role: action.role,
        positions: action.positions,
        email: action.email,
        userId: action.userId,
        name: action.name,
        events: action.events,
        userDocId: action.userDocId,
        approved: action.approved,
        language: action.language
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
