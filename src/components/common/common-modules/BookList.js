import React  from 'react'
import {Router, Route, Switch, Link} from 'react-router-dom'
import history from '../../../router/history'
import api from '../../../modules/api/api'
import { Button, WingBlank, WhiteSpace, NavBar } from 'antd-mobile';

const BookList = props => {
    let books = props.bookListData
    console.log(JSON.stringify(books[0]))
    const styles = {
        flexContainer: {
            borderBottom: 12
        },
        searchResult: {
            bacground: '#1296db',
            width: '100%',
            height: 'auto'
        },
        hr: {
            height: 12,
            border: 0,
            boxShadow: 'inset 0 12px 12px -12px rgba(0, 0, 0, 0.5)'
        },
        book: {
            marginTop: 12
        },
        bookCover: {
            width: 98,
            height: 120,
            float: 'left',
            border: '1px solid #ebebeb',
            background: 'url(../images/img-bk.png) no-repeat center',
        },
        bookRight: {
            height: '100%',
        },
        bookName: {
            // height: 22,
            // lineHeight: 22,
            color: '#333 !important'
        },
        split: {
            padding: '0 10'
        },
        bookPopularity: {
            color: '#d82626'
        }
    }
    return (
        //todo 分页
        <div className="flex-container" style={styles.flexContainer}>
                <NavBar
                    mode="dark"
                    leftContent=""
                    rightContent={[]}
                >搜索结果</NavBar>
                {books.map((item, index) => {
                    return (
                        <div className="book" key={index} target="_blank" 
                            style={styles.book}
                            to={{
                                pathname: "/book",
                                state: {bookId: item._id}
                            }}                                
                        >
                            <WingBlank size="md">
                                <img src={getImageUrl(item.cover)} 
                                    ref={img => this.img = img}
                                    onError={(e) => {
                                        this.img.src = require('../image/img-bk.png');}}
                                    style={styles.bookCover} alt="加载失败"
                                />
                                <div className="right" style={styles.bookRight}>
                                    <h4 className="name" style={styles.bookName}>
                                        <span>{item.title}</span>
                                    </h4>
                                    <p className="author"><span>{item.author}</span></p>
                                    <p className="desc">{item.shortIntro}</p>
                                    <p className="popularity">
                                        <span style={styles.bookPopularity}>{getLatelyFollower(item.latelyFollower)}</span>人气
                                        <span className="split" style={styles.split}>|</span>
                                        <span style={styles.bookPopularity}>{item.retentionRatio + '%'}</span>读者收藏
                                        <Button type="ghost" size="small"
                                            onClick={() => {
                                                history.push({
                                                    pathname: "/book",
                                                    state: {
                                                        bookId: item._id
                                                    }
                                                })
                                            }}
                                        >
                                            查看详情
                                        </Button>
                                    </p>
                                </div>
                                <hr style={styles.hr} />
                                <WhiteSpace size="md" />
                            </WingBlank>
                        </div>
                    )
                })}
        </div>
    )
}

const getLatelyFollower = (latelyFollower) => {
    if (latelyFollower >= 10000) {
        return (latelyFollower / 10000).toFixed(2) + "万";
    } else {
        return latelyFollower + "";
    }
}

const getImageUrl = (curUrl) => {
    if(curUrl.indexOf(api.IMG_BASE_URL)!=-1){
        return curUrl;
    }
    return api.IMG_BASE_URL + curUrl;
}

const onChange = (page, pageSize) => {
    setTimeout(()=>{
        let curData= this.bookListData.slice((page-1)*pageSize,page*pageSize);
        console.log(page+"-"+pageSize+",curData:"+curData.length);
        this.setState({
            bookListData:curData
        });
    },200);
}



export default BookList