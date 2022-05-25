import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/analytics";
import "firebase/storage";

const firebaseConfig = JSON.parse(process.env.REACT_APP_PROD_CONFIG);
firebase.initializeApp(firebaseConfig);

export default firebase;
export const auth = firebase.auth();
export const functions = firebase.functions();
export const firestore = firebase.firestore();
export const analytics = firebase.analytics();
export const storage = firebase.storage();
export const storageRef = storage.ref();
export const getTimestamp = () => {
    return firebase.firestore.FieldValue.serverTimestamp();
};
