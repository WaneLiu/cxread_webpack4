import React, { PureComponent } from 'react'
import api from '../../../modules/api/api'
import { Button } from 'antd-mobile';
import history from '../../../router/history'
import  * as ConstData from '../../../modules/constants/ConstData'
import { connect } from 'react-redux'
import { add_read_history } from '../../../actions/readHistoryAction'
import '../style/chapterPage.css'
class BookDetailContent extends PureComponent {
    constructor(props) {
        super(props)
        this.bookChapterList = this.props.bookChapterList
        this.length = this.bookChapterList.length
        this.state = {
            isShowChapterList: false,
            idx: 0
        }       
    }

    getWordCount(wordCount) {
        return wordCount > 10000 ? 
            (wordCount / 10000).toFixed(0) + '万字' : wordCount + "字"
    }

    getLatelyFollower(latelyFollower) {
        return latelyFollower > 10000 ?
            (latelyFollower / 10000).toFixed(2) + '万' : latelyFollower + ""
    }

    getChapterListClassName(){
        return this.state.isShowChapterList ?  "chapter-list":"chapter-list hidden-list";
    }
    //点击下一页触发的函数
    onClickPre = () => {
        if (this.state.idx == 0) {
            alert("前面没有内容!")
            return
        }
        this.setState({
            idx: this.state.idx - 1
        })
    }
    //点击上一页触发的函数
    onCLickNext = () => {
        if (this.state.idx == (Math.ceil(this.length / 10) - 1)) {
            alert("后面没有内容了!")
            return
        }
        this.setState({
            idx: this.state.idx + 1
        })
    }

    //点击首页
    onClickFirstPage = () => {
        this.setState({
            idx: 0
        })
    }

    //点击末页
    onClickLastPage = () => {
        this.setState({
            idx: Math.ceil(this.length / 10) - 1
        })
    }

    

    render() {
        const { bookDetail} = this.props
        if (JSON.stringify(bookDetail) === "{}") {
            console.log("{}: " + bookDetail)
            return <div/>
        }
        return (
            <div>
                <div className="book-info">
                    <img 
                        src={api.IMG_BASE_URL + bookDetail.cover}
                        alt={bookDetail.title} className="cover"
                    />
                    <div className="info">
                        <h1>{bookDetail.title}</h1>
                        <p className="tags">
                            <i style={{background: "#86bfec"}}>{bookDetail.majorCate}</i>
                            <i style={{background: "#f5b572"}}>{bookDetail.minorCate}</i>
                        </p>
                        <p className="sup">
                            {bookDetail.author}<span>|</span>{bookDetail.minorCate}<span>|</span>{this.getWordCount(bookDetail.wordCount)}
                        </p>
                        <Button disabled type="ghost" size="small"
                            onClick={() => {
                                history.push({
                                    pathname: "/read",
                                    state: {
                                        type: ConstData.READ_BOOK_START,
                                        bookName: bookDetail.title,
                                        bookId: bookDetail._id,
                                        chapter: {chapterUrl:this.bookChapterList[0].link,num:0,title:this.bookChapterList[0].title},
                                        bookChapterLength: this.bookChapterList.length,
                                        bookChapterList: this.bookChapterList 
                                    }
                                })
                            }}
                        >
                            开始阅读
                        </Button>
                    </div>
                </div>
                <div className="book-data">
                    <div>
                        <i className="key">追书人数</i>
                        <i className="value">{this.getLatelyFollower(bookDetail.latelyFollower)}</i>
                    </div>
                    <div>
                        <i className="key">读者留存率</i>
                        <i className="value">{bookDetail.retentionRatio + "%"}</i>
                    </div>
                </div>
                <div className="book-section">
                    <h3>《{bookDetail.title}》简介:</h3>
                    <p className="content intro">
                        {bookDetail.longIntro}
                    </p>
                </div>
                <div className="book-section">
                    <h3>《{bookDetail.title}》目录:<span className="more"><i>全部章节</i><i onClick={()=>{
                        this.setState({
                            isShowChapterList:!this.state.isShowChapterList
                        });
                    }} className="arrow"/></span></h3>
                    <ul className={this.getChapterListClassName()}>
                        <div className="chapterContent">
                            {this.bookChapterList.slice(this.state.idx * 10, (this.state.idx+1) * 10).map((value, index) => {
                                return <li key={index} className="chapterButtonList"><Button className="chapterButton" onClick={() => {
                                    //console.log('chapterList: ' + JSON.stringify(bookChapterList))
                                    //点击之后先dispatch再跳转页面
                                    this.props.addReadHistory(bookDetail.title, index, this.bookChapterList,
                                         value.title, bookDetail.cover, value.link, bookDetail._id
                                    )
                                    history.push({
                                        pathname: '/read',
                                        state: {
                                            type:ConstData.READ_BOOK_MIDDLE,
                                            bookName:bookDetail.title,
                                            chapter: {chapterUrl:value.link,num:index,title:value.title},
                                            bookId: bookDetail._id,
                                            bookChapterLength: bookDetail.chaptersCount,
                                            bookChapterList: this.bookChapterList,
                                        }
                                    });
                                }}>{value.title}</Button></li>;
                            })}
                            <div className="chapterPage">
                                <a className="firstPage" onClick={this.onClickFirstPage}>首页</a>
                                <a className="prePage" onClick={this.onClickPre}>上一页</a>
                                <a className="nextPage" onClick={this.onCLickNext}>下一页</a>
                                <a className="lastPage" onClick={this.onClickLastPage}>末页</a>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addReadHistory: (bookName, currentChapterNum, 
            chapterList, chapterTitle, bookCover, chapterUrl) => {
                dispatch(add_read_history(bookName, currentChapterNum, 
                    chapterList, chapterTitle, bookCover, chapterUrl))
            }
    }
}

export default connect(null, mapDispatchToProps)(BookDetailContent)