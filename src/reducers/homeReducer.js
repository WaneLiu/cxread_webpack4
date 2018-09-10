import * as types from "../modules/constants/actionTypes";
import * as ConstData from '../modules/constants/ConstData'

const initialState = {
    tags: {},
    tagsV2: {},
    nodes:[],
    chartsDetail:[],
    chartsDetailBooks:[],
    spreadData:[],
    total: 0,
    tagsState: false,
    error: "",
    type: types.SELECTION_NODES_BOOKS_LOADING,
    dataState: ConstData.DATA_EMPTY
};

const home = (state = initialState, action) => {
    switch (action.type) {
        case types.DISCOVER_CATEGORY_LIST:
            return {...state, tags: action.tags, tagsState: true}

        case types.DISCOVER_CHARTS_DETAIL:
            return {
                ...state, chartsDetail: action.chartsDetail, 
                    chartsDetailBooks: action.chartsDetail.books
            }

        default:
            return state
    }
}
export default home