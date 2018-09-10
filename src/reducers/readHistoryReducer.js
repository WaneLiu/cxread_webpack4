import {ADD_READ_HISTORY, MODIFY_READ_HISTORY} from '../modules/constants/actionTypes'

/**
 * read history state
 * bookName, bookCover, chapterTitle, chapterList, sortId, currentChapterNum
 */

let initialState = []

const read_history = (state = initialState, action) => {
    switch (action.type) {
        case ADD_READ_HISTORY:
            return [
                {
                    bookName: action.bookName,
                    bookCover: action.bookCover,
                    chapterTitle: action.chapterTitle,
                    chapterList: action.chapterList,
                    currentChapterNum: action.currentChapterNum,//BookDetailContent传过来的index
                    chapterUrl: action.chapterUrl,
                    bookId: action.bookId,
                    sortId: action.sortId
                },
                ...state
            ]
        case MODIFY_READ_HISTORY:
            return state.map((item) => {
                if ( item.bookName === action.bookName ) {
                    return {...item, currentChapterNum: action.currentChapterNum,
                        chapterTitle: action.chapterTitle, chapterUrl: action.chapterUrl,
                        sortId: action.sortId
                    }
                } else {
                    return item
                }
            })
        default:
            return state
    }
}

export default read_history

