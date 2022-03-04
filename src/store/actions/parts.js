import * as actionTypes from './actionTypes';
import { firestore } from "../../firebase";

async function getParts() {
    // let parts = [{name: 'poop', id: 1, category: 'Air', pictureUrl: 'https://firebasestorage.googleapis.com/v0/b/carwash-57347.appspot.com/o/parts%2FAir%2FAIR%3A1%2F4inch-PTF%20x%20%20MNPT%20Elbow?alt=media&token=d4a1da37-655d-40b1-a839-3dfd5ab4bb78'}];
    let parts = [];
    const partsRef = await firestore.collection('parts')
        .orderBy("name", "asc")
        .get();
    partsRef.forEach((part) => {
        parts.push({...part.data(), id: part.id});
    });
    return parts;
}

export const onFetchParts = () => {
    return dispatch => {
        dispatch(partsStart());
        getParts()
            .then((parts) => {
                dispatch(partsSuccess());
                dispatch(setParts(parts));
            })
            .catch(error => {
                partsFail(error)
            });
    }
};

export const partsStart = () => {
    return {
        type: actionTypes.PARTS_START
    };
};

export const partsSuccess = () => {
    return {
        type: actionTypes.PARTS_SUCCESS
    };
};

export const partsFail = (error) => {
    return {
        type: actionTypes.PARTS_FAIL,
        error: error
    };
};

export const addPart = (part) => {
    return {
        type: actionTypes.ADD_PART,
        part: part
    };
};

export const onAddPart = (part) => {
    return dispatch => {
        dispatch(partsStart());
        firestore.collection('parts')
            .add(part)
            .then((response) => {
                part.id = response.id;
                dispatch(partsSuccess());
                dispatch(addPart(part));
            })
            .catch(error => {
                dispatch(partsFail(error));
            });
    }
};

export const editPart = (part, id) => {
    return {
        type: actionTypes.EDIT_PART,
        part: part,
        id: id
    };
};

export const onEditPart = (part, id) => {
    return dispatch => {
        dispatch(partsStart());
        firestore.collection('parts')
            .doc(id)
            .update(part)
            .then(() => {
                dispatch(partsSuccess());
                dispatch(editPart(part, id));
            })
            .catch(error => {
                dispatch(partsFail(error));
            });
    }
};


export const removePart = (id) => {
    return {
        type: actionTypes.REMOVE_PART,
        id: id
    };
};

export const onRemovePart = (id) => {
    return dispatch => {
        dispatch(partsStart());
        firestore.collection('parts')
            .doc(id)
            .delete()
            .then(() => {
                dispatch(partsSuccess());
                dispatch(removePart(id));
            })
            .catch(error => {
                dispatch(partsFail(error));
            });
    }
};

export const setParts = (parts) => {
    return {
        type: actionTypes.SET_PARTS,
        parts: parts
    };
};
