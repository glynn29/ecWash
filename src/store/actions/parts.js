import * as actionTypes from './actionTypes';
import { firestore } from "../../firebase";

async function getParts() {
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

export const onAddPart = (part, id) => {
    return dispatch => {
        dispatch(partsStart());
        firestore.collection('parts')
            .doc(id)
            .set(part)
            .then(() => {
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
    let cleanedPart = {...part};
    delete cleanedPart.id;
    delete cleanedPart.category;

    return dispatch => {
        dispatch(partsStart());
        firestore.collection('parts')
            .doc(id)
            .update(cleanedPart)
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
