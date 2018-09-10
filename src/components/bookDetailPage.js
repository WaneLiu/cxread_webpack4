import React, { PureComponent } from 'react'
import { BackTop } from 'antd'
import api from '../modules/api/api'
import BookDetailContent from './common/common-modules/BookDetailContent'
class Book extends PureComponent {
    constructor(props) {
        super(props)
        //this.bookId = this.props.location.search.split('=')[1]
        this.bookId = this.props.location.state.bookId
        this.state = {
            bookId: this.bookId,
            bookDetail: {},
            bookChapterList: [],
            state: 'loading',//做数据加载时标识
        }
    }

    fetchBookDetail = async (bookId) => {
        try {
            this.setState({
                state: 'loading'
            })
            let res1 = await fetch(api.BOOK_DETAIL(bookId))
            let data1 = await res1.json()
            let res2 = await fetch(api.READ_BOOK_CHAPTER_LIST(bookId))
            let data2 = await res2.json()

            //console.log(data1)
            //console.log('bookDetailPage: '+data2.ok)
            //ok: true查询到内容 ok:false没查询到
            data2.ok ? 
                this.setState({
                    bookDetail: data1,
                    bookChapterList: data2.mixToc.chapters,
                    state: 'hidden'
                }) : this.setState({
                    state: 'not found'
                })
        } catch (error) {
            //todo
            console.log(error)
        }
    }

    componentDidMount() {
        //console.log('did mount')
        this.fetchBookDetail(this.state.bookId)
    }

    renderContent(type) {
        let content = <div/>
        if (type === 'loading') {
            content = <div className="loading">加载中</div>
        } else if (type === 'hidden') {
            content = <BookDetailContent bookChapterList={this.state.bookChapterList}
                bookDetail={this.state.bookDetail}/>  
        } else {
            content = <div className="notfound">当前小说没有入库</div>
        }
        return content
    }

    render() {
        //console.log('start bookpage')
        return (
            <div className="page-detail-container">
                <BackTop />
                {this.renderContent(this.state.state)}
            </div>
        )
    }
}

export default Book