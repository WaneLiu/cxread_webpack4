import React, { PureComponent } from 'react'
import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux'
import './common/style/bookShelves.css'
import BookShelfItem from './common/common-modules/BookShelfItem';


const Bookshelves = ({read_history}) => {
    return (
        <div className="book-shelf">
            <NavBar>书架</NavBar>
            <div className="book-shelf-content">
                <div className="recent-read-icon">最近阅读</div>
                <div  className="book-shelf-list">
                    {read_history.map(item => 
                        <BookShelfItem 
                            key={item.bookName}
                            bookCover={item.bookCover}
                            chapterTitle={item.chapterTitle}
                            bookName={item.bookName}
                            chapterUrl={item.chapterUrl}
                            num={item.currentChapterNum}
                            bookId={item.bookId}
                            chapterList={item.chapterList}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    read_history: state.read_history
})

export default connect(mapStateToProps)(Bookshelves)