import {ADD_READ_HISTORY, MODIFY_READ_HISTORY} from '../modules/constants/actionTypes'

let sortId = 100000

export const add_read_history = (bookName, currentChapterNum, 
    chapterList, chapterTitle, bookCover, chapterUrl, bookId) => ({
        type: ADD_READ_HISTORY,
        bookName,//不变的
        bookCover,//不变的
        chapterTitle,
        chapterUrl,
        currentChapterNum,
        chapterList,//不变的
        bookId,
        sortId: sortId++    
    })
/**
 * 根据bookName从state数组中过滤出查询数据，然后根据...rest修改
 * bookList和bookCover是不变的
 */
export const modify_read_history = (bookName, currentChapterNum, chapterTitle, chapterUrl) => ({
    bookName,
    currentChapterNum,
    chapterTitle,
    chapterUrl,
    sortId: sortId++
})