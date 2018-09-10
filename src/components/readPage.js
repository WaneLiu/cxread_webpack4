import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import  * as ConstData from '../modules/constants/ConstData'
import api from '../modules/api/api'
import './common/style/readPage.css'
import { connect } from 'react-redux'
// import {getScrollHeight, getScrollTop, getWindowHeight} from '../modules/utils/pageUtil'
// import { Pagination, Icon, NavBar, SegmentedControl, Modal } from 'antd-mobile';
class Read extends PureComponent {
    constructor(props) {
        super(props)
        console.log('super')
        const docEl = document.body;
        docEl.style.background = '#d1d6be';
        this.data = this.props.location.state;//从book detail content传来的type bookid bookname chapter
        this.type = this.data ? this.data.type : ConstData.DATA_INVAILD;
        this.bookId = this.data ? this.data.bookId : -1;
        this.bookName = this.data ? this.data.bookName : -1;
        this.bookChapterLength = this.data ? this.data.bookChapterLength : -1
        this.chapterList = this.data.bookChapterList
        //console.log('chapterlist: ' + this.chapterList)
        this.state = {
            currentChapterNum: this.data.chapter.num,//当前的章节数
            chapterContent: "",
            title: "",
            chapterUrl: "",

            getPageContentSuccess: false,//标识这一章节的内容是否已经成功获取
            visible: false
        };
        this.newHandleScroll = this.handleScroll.bind(this);
    }

    handleScroll(e) {
        //console.log(e);
        let scrollEle = e.target.scrollingElement;
        const clientHeight = scrollEle.clientHeight;
        let t = scrollEle.scrollTop;
        let c = this.refs.content;
        let top = t <= 40 ? 40 - t : 0;
        //let bottom = t >= c.height + c.offsetTop - clientHeight ? 40 : 0;
        //console.log(t + "--" + c.height + "--" + c.offsetTop + "--" + clientHeight);
        this.setState({
            leftToolBarTop: top,
            //rightToolbarBottom: bottom
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.newHandleScroll);
        document.body.style.background = "white"
    }

    //将用户当前的阅读进度同步到数据库
    asyncCurrentReadChapterNum = (currentChapterNum) => {

    }

    //点击开始阅读时候抓取的数据
    fetchReadBookChapterListAndStartRead = async (bookId) => {
        try {
            let res = await fetch(api.READ_BOOK_CHAPTER_LIST(bookId))
            let data = await res.json()
            data = data.mixToc.chapters
            this.setState({
                chapterList: data,
                currentChapterNum: 0
            })

        } catch (error) {
            
        }
    }

    //点击章节时候住区数据
    fetchChapterDetail = async (chapterUrl, num, title) => {
        try {
            let tempUrl = chapterUrl.replace(/\//g, '%2F').replace('?', '%3F')
            //console.log('tempUrl: ' + tempUrl)
            //console.log(api.READ_BOOK_CHAPTER_DETAIL(tempUrl))
            let res = await fetch(api.READ_BOOK_CHAPTER_DETAIL(tempUrl))
            //console.log("res" + JSON.stringify(res))
            let data = await res.json()
            //console.log("type: " + typeof data.chapter.body)
            data.ok ?
            this.setState({
                chapterContent: data.chapter.body.replace(/\n/gm, '<br />'),
                title: title,
                currentChapterNum: num,
                getPageContentSuccess: true
            }) : this.setState({})
            window.scrollTo(0, 0)
            //console.log(this.state.title)
            //console.log(this.state.chapterContent)
        } catch (error) {
            
        }
    }

    //自动滚动
    autoScroller() {
        let position = 0
        while (true) {
            // if (getScrollTop() + getWindowHeight() === getScrollHeight()) {
            //     break
            // }
            if( window.scrollHeight-window.scrollTop===window.clientHeight ) {
                break
            }
            //console.log("12345678")
            position++
            window.scroll(0, position)
            clearTimeout(timer)
            var timer = setTimeout(() => {}, 100);
        }
    }

    componentDidMount() {
        let {title } = this.data.chapter
        let num = this.state.currentChapterNum
        let chapterUrl = this.chapterList[this.state.currentChapterNum].link
        //console.log(title + num + chapterUrl )
        if (this.type === ConstData.DATA_INVAILD) {
            return
        }
        //第一次阅读时
        if (this.type === ConstData.READ_BOOK_START) {
            //todo 一些开始阅读的东西需要补充，开始阅读:继续阅读 模式
            this.chapterIndex = 0
            this.fetchReadBookChapterListAndStartRead(this.bookId)
        } else if (this.type === ConstData.READ_BOOK_MIDDLE) {
            //console.log("data: " + JSON.stringify(this.data))
            this.fetchChapterDetail(chapterUrl, num, title)
        }
        //this.autoScroller()
        window.addEventListener('scroll', this.newHandleScroll);
        let position = 0
        //console.log(position)
        //setInterval(() => window.scroll(0, position++), 0.05)
    }

    componentDidUpdate() {
        let position = 0
        //console.log(position)
        //setInterval(() => window.scroll(0, position++), 0.05) 
    }

    componentDidUpdate() {
        
    }

    renderContentByDataState() {
        let getPageContentSuccess = this.state.getPageContentSuccess
        let renderContent = <div />
        //console.log(this.state.chapterContent) 
        !getPageContentSuccess ? 
            renderContent = <div>加载中...</div> : 
            renderContent = 
                <div className="content-wrap">
                    <h4 className="title">
                        <span>{this.bookName}</span>
                        <span className="current-chpater">{this.state.title}</span>
                    </h4>
                    <div ref="content" className="content" >
                        <input type="hidden" id="vip" name="" value="false" />
                        <div className="inner-text" dangerouslySetInnerHTML={{
                            __html: this.state.chapterContent
                        }}></div>
                    </div>
                    <div>
                        
                    </div>
                </div>

        return renderContent

    }

    onClickPre = () => {
        console.log('click pre')
        if (this.state.currentChapterNum === 0) {
            alert('当前已是第一章')
        } else {
            let num = this.state.currentChapterNum - 1
            let title = this.chapterList[num].title
            let chapterUrl = this.chapterList[num].link
            this.fetchChapterDetail(chapterUrl, num, title)
        }
    }

    onClickNext = () => {
        if (this.state.currentChapterNum === this.bookChapterLength - 1) {
            alert('当前已是最后一章')
        } else {
            let num = this.state.currentChapterNum + 1
            let title = this.chapterList[num].title
            let chapterUrl = this.chapterList[num].link
            this.fetchChapterDetail(chapterUrl, num, title)
        }
    }

    render() {
        return (
            
            <div className="page-reader-wrap">
                {this.renderContentByDataState()}
                <div className="pre_next">
                    <a className="pre_chapter" onClick={this.onClickPre}>上一章</a>
                    <a className="next_chapter" onClick={this.onClickNext}>下一章</a>
                </div>
            </div>
        )
    }


}

export default Read