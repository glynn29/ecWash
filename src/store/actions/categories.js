import * as actionTypes from './actionTypes';
import { firestore } from "../../firebase";

async function getCategories() {
    let categories = [];
    const categoriesRef = await firestore.collection('categories')
        .orderBy('name', 'asc')
        .get();
    categoriesRef.forEach((category) => {
        categories.push({...category.data(), id: category.id});
    });
    return categories;
}

export const onFetchCategories = () => {
    return dispatch => {
        dispatch(categoriesStart());
        getCategories()
            .then((categories) => {
                dispatch(categoriesSuccess());
                dispatch(setCategories(categories));
            })
            .catch(error => {
                categoriesFail(error)
            });
    }
};

export const categoriesStart = () => {
    return {
        type: actionTypes.CATEGORIES_START
    };
};

export const categoriesSuccess = () => {
    return {
        type: actionTypes.CATEGORIES_SUCCESS
    };
};

export const categoriesFail = (error) => {
    return {
        type: actionTypes.CATEGORIES_FAIL,
        error: error
    };
};

export const setCategories = (categories) => {
    return {
        type: actionTypes.SET_CATEGORIES,
        categories: categories
    };
};
