import React, { PureComponent } from 'react'
import api from '../../../modules/api/api'
import history from '../../../router/history';
import  * as ConstData from '../../../modules/constants/ConstData'

/**
 * 最近阅读显示的 阅读记录的组件
 */
class BookShelfItem extends PureComponent {

    render() {
        const {bookName, bookCover, chapterTitle, chapterUrl, num, bookId, chapterList} = this.props
        return (
            <div className="book-shelf-item"
                onClick={() => {
                    history.push({
                        pathname: '/read',
                        state: {
                            type:ConstData.READ_BOOK_MIDDLE,
                            bookName,
                            chapter: {chapterUrl,num,title:chapterTitle},
                            bookId,
                            bookChapterLength: chapterList.length,
                            bookChapterList: chapterList,
                        }
                    })
                }}
            >
                <img src={api.IMG_BASE_URL + bookCover} 
                    alt={bookName} className="book-cover"
                />
                <div className="book-shelf-book-name">{bookName}</div>
                <div className="book-shelf-chapter-title">{chapterTitle.split(/\s+/)[0]}</div>
            </div>
        )
    }
}

export default BookShelfItem