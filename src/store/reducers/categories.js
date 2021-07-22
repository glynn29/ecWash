import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    categories: [],
    error: null,
    loading: false,
};

const categoriesStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const categoriesSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false
    });
};

const categoriesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const setCategories = (state, action) => {
    return updateObject( state, {
        categories: action.categories,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CATEGORIES_START:
            return categoriesStart(state, action);
        case actionTypes.CATEGORIES_SUCCESS:
            return categoriesSuccess(state, action);
        case actionTypes.CATEGORIES_FAIL:
            return categoriesFail(state, action);
        case actionTypes.SET_CATEGORIES:
            return setCategories(state, action);
        default:
            return state;
    }
};

export default reducer;
