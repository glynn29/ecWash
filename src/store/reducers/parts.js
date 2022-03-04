import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    parts: [],
    error: null,
    loading: false,
};

const partsStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const partsSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false
    });
};

const partsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const addPart = (state, action) => {
    const updatedParts = state.parts.concat(action.part);

    return updateObject(state, {
        parts: updatedParts,
    });
};

const editPart = (state, action) => {
    const updatedParts = [...state.parts];
    const partIndex = updatedParts.findIndex((part) => part.id === action.id);
    updatedParts[partIndex] = action.part;

    return updateObject(state, {
        parts: updatedParts,
    });
};

const removePart = (state, action) => {
    const updatedParts = state.parts.filter((part) => part.id !== action.id);

    return updateObject(state, {
        parts: updatedParts,
    });
};

const setParts = (state, action) => {
    return updateObject(state, {
        parts: action.parts,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PARTS_START:
            return partsStart(state, action);
        case actionTypes.PARTS_SUCCESS:
            return partsSuccess(state, action);
        case actionTypes.PARTS_FAIL:
            return partsFail(state, action);
        case actionTypes.ADD_PART:
            return addPart(state, action);
        case actionTypes.EDIT_PART:
            return editPart(state, action);
        case actionTypes.REMOVE_PART:
            return removePart(state, action);
        case actionTypes.SET_PARTS:
            return setParts(state, action);
        default:
            return state;
    }
};

export default reducer;
