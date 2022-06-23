import * as actionTypes from './actionTypes';
import { firestore } from "../../firebase";

async function getUsers() {
    let users = [];
    const usersRef = await firestore.collection('users')
        .get();
    usersRef.forEach((user) => {
        users.push({ ...user.data(), id: user.id });
    });
    return users;
}

export const onFetchUsers = () => {
    return dispatch => {
        dispatch(usersStart());
        getUsers()
            .then((users) => {
                dispatch(usersSuccess());
                dispatch(setUsers(users));
            })
            .catch(error => {
                usersFail(error)
            });
    }
};

export const usersStart = () => {
    return {
        type: actionTypes.USERS_START
    };
};

export const usersSuccess = () => {
    return {
        type: actionTypes.USERS_SUCCESS
    };
};

export const usersFail = (error) => {
    return {
        type: actionTypes.USERS_FAIL,
        error: error
    };
};

export const addUser = (user) => {
    return {
        type: actionTypes.ADD_USER,
        user: user
    };
};

export const onAddUser = (user) => {
    return dispatch => {
        dispatch(usersStart());
        firestore.collection('users')
            .doc(user.email)
            .set(user)
            .then(() => {
                user.id = user.email;
                dispatch(usersSuccess());
                dispatch(addUser(user));
            })
            .catch(error => {
                dispatch(usersFail(error));
            });
    }
};

export const editUser = (user, id) => {
    return {
        type: actionTypes.EDIT_USER,
        user: user,
        id: id
    };
};

export const onEditUser = (user, id) => {
    return dispatch => {
        dispatch(usersStart());
        firestore.collection('users')
            .doc(id)
            .update(user)
            .then(() => {
                dispatch(usersSuccess());
                dispatch(editUser(user, id));
            })
            .catch(error => {
                dispatch(usersFail(error));
            });
    }
};


export const removeUser = (id) => {
    return {
        type: actionTypes.REMOVE_USER,
        id: id
    };
};

export const onRemoveUser = (id) => {
    return dispatch => {
        dispatch(usersStart());
        firestore.collection('users')
            .doc(id)
            .delete()
            .then(() => {
                dispatch(usersSuccess());
                dispatch(removeUser(id));
            })
            .catch(error => {
                dispatch(usersFail(error));
            });
    }
};

export const setUsers = (users) => {
    return {
        type: actionTypes.SET_USERS,
        users: users
    };
};
