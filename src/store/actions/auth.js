import * as actionTypes from './actionTypes';
import { auth, firestore, functions } from "../../firebase";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = () => {
    return {
        type: actionTypes.AUTH_SUCCESS,
    };
};

export const registerSuccess = () => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        registered: true
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const getCurrentUser = (user) => {
    return {
        type: actionTypes.FETCH_CURRENT_USER,
        first: user.first,
        last: user.last,
        nickName: user.nickName,
        email: user.email,
        city: user.city,
        state: user.state,
        zip: user.zip,
        address: user.address,
        locationPhone: user.locationPhone,
        managerPhone: user.managerPhone,
        id: user.id,
        approved: user.approved
    }
};

export const logout = () => {
    auth.signOut()
        .then(() => console.log("user signed out"));
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const login = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                dispatch(authSuccess());
            })
            .catch(error => dispatch(authFail(error.message)))
    }
};

export const register = (registerData) => {
    return dispatch => {
        dispatch(authStart());
        const createNewUser = functions.httpsCallable('createNewUser');
        createNewUser({ email: registerData.email, password: registerData.password, isAdmin: false })
            .then(() => {
                dispatch(registerSuccess());
                createUser(registerData)
                    .catch(error => console.log(error.message));
            })
            .catch(error => dispatch(authFail(error.message)))
    }
};

async function createUser({ first, last, email, city, state, zip, address, locationPhone, managerPhone }) {
    const userRef = firestore.collection('users')
        .doc(email);
    await userRef.set(
        {
            first: first,
            last: last,
            email: email,
            city: city,
            state: state,
            zip: zip,
            address: address,
            locationPhone: locationPhone,
            managerPhone: managerPhone,
            approved: 'false',
        }
    );
}

export const getUser = () => {
    return dispatch => {
        const { email } = auth.currentUser;
        firestore.collection('users')
            .doc(email)
            .get()
            .then((user) => {
                dispatch(getCurrentUser(user.data()));
            });
    }
};
