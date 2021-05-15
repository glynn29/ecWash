import * as actionTypes from './actionTypes';
import {auth, firestore} from "../../firebase";

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = () => {
    return{
        type: actionTypes.AUTH_SUCCESS,
    };
};

export const registerSuccess = () => {
    return{
        type: actionTypes.REGISTER_SUCCESS,
        registered: true
    }
};

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const getCurrentUser = (user) => {
    return{
        type: actionTypes.FETCH_CURRENT_USER,
        positions: user.positions,
        email: user.email,
        userId: user.id,
        role: user.role,
        userDocId: user.userDocId,
        name: user.first + " " + user.last,
        events: user.events,
        approved: user.approved,
        language: user.language
    }
};

export const logout = () => {
    auth.signOut().then(() => console.log("user signed out"));
    return{
      type: actionTypes.AUTH_LOGOUT
    };
};

export const login = (email, password) => {
  return dispatch =>{
      dispatch(authStart());
      auth.signInWithEmailAndPassword(email,password)
          .then(()=>{
              console.log("logged in");
              dispatch(getUser());
              dispatch(authSuccess());
          })
          .catch(error => dispatch(authFail(error.message)))
  }
};

async function createUser({first, last, email, role, language, positions}) {
    console.log("adding user",first,last,email,role,language,positions);
    const user = await auth.currentUser;
    await firestore.collection('users').add({
        first: first,
        last: last,
        email: email,
        role: role,
        language: language,
        id: user.uid,
        approved: 'false',
        positions: positions,
        events: []
    });
}

export const register = (registerData) => {
    return dispatch => {
        dispatch(authStart());
        console.table(registerData);
        auth.createUserWithEmailAndPassword(registerData.email, registerData.password)
            .then(()=>{
                dispatch(registerSuccess());
            })
            .then(()=>{
                createUser(registerData).catch(error => console.log(error.message));
            })
            .catch(error => dispatch(authFail(error.message)))
    }
};

export const getUser = () => {
     return dispatch => {
        const {uid} = auth.currentUser;
        firestore.collection('users').where('id', '==', uid).get()
            .then((res) => {
                res.forEach(user => {
                    firestore.collection('users').doc(user.id).collection("volunteerEvents").orderBy("date","desc").get()
                        .then((res)=> {
                            let eventList = [];
                           res.forEach(event => {
                               eventList.push(event.data());
                           });
                            dispatch(getCurrentUser({...user.data(), userDocId: user.id, events:eventList}))
                        });

                });
          });
    }
};
