import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    users: [],
    error: null,
    loading: false,
};

const usersStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const usersSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false
    });
};

const usersFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const addUser = (state, action) => {
    const updatedUsers = state.users.concat(action.user);

    return updateObject(state, {
        users: updatedUsers,
    });
};

const editUser = (state, action) => {
    const updatedUsers = [...state.users];
    const userIndex = updatedUsers.findIndex((user) => user.id === action.id);
    updatedUsers[userIndex] = action.user;

    return updateObject(state, {
        users: updatedUsers,
    });
};

const removeUser = (state, action) => {
    const updatedUsers = state.users.filter((user) => user.id !== action.id);

    return updateObject(state, {
        users: updatedUsers,
    });
};

const setUsers = (state, action) => {
    return updateObject(state, {
        users: action.users,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USERS_START:
            return usersStart(state, action);
        case actionTypes.USERS_SUCCESS:
            return usersSuccess(state, action);
        case actionTypes.USERS_FAIL:
            return usersFail(state, action);
        case actionTypes.ADD_USER:
            return addUser(state, action);
        case actionTypes.EDIT_USER:
            return editUser(state, action);
        case actionTypes.REMOVE_USER:
            return removeUser(state, action);
        case actionTypes.SET_USERS:
            return setUsers(state, action);
        default:
            return state;
    }
};

export default reducer;
