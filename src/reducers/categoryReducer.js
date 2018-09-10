import * as types from "../modules/constants/actionTypes";
import * as ConstData from '../modules/constants/ConstData'

const initialState = {
    tags: {},
    tagsV2:{},
    bookList: [],
    total: 0,
    booksState: false,
    error: "",
    type: types.SELECTION_NODES_BOOKS_LOADING,
    dataState: ConstData.DATA_EMPTY
};

const category = (state = initialState, action) => {
    switch (action.type) {
        case types.DISCOVER_CATEGORY_LIST:
            return {...state, tags: action.tags}
        default:
            return state
    }
}

export default category