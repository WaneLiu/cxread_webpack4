import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import  * as ConstData from '../modules/constants/ConstData'
import api from '../modules/api/api'

class Read extends PureComponent {
    constructor(props) {
        super(props)
        const docEl = document.body;
        docEl.style.background = '#d1d6be';
        this.data = this.props.location.state;
        this.type = this.data ? this.data.type : ConstData.DATA_INVAILD;
        this.bookId = this.data ? this.data.bookId : -1;
        this.bookName = this.data ? this.data.bookName : -1;
        this.state = {
            chapterList: [],
            currentChapterUrl: "",
            title: "",
            leftToolBarTop: 40,
            rightToolbarBottom: 0,
            visible: false
        };
        this.showModal = () => {
            this.setState({
                visible: true,
            });
        };
        this.newHandleScroll = this.handleScroll.bind(this);
    }
    //第一次阅读时候抓取的数据
    fetchReadBookChapterListAndStartRead = async (bookId) => {
        try {
            let res = await fetch(api.READ_BOOK_CHAPTER_LIST(bookId))
            let data = await res.json()
            data = data.mixToc.chapters
            this.setState({
                chapterList: data,
                currentChapterUrl: data[0].link
            })
        } catch (error) {
            
        }
    }

    componentDidMount() {
        if (this.type === ConstData.DATA_INVAILD) {
            return
        }
        //第一次阅读时
        if (this.type === ConstData.READ_BOOK_START) {
            this.chapterIndex = 0
            this.fetchReadBookChapterListAndStartRead(this.bookId)
        }
    }


}

export default Read