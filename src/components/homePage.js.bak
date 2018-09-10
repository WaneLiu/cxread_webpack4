/**
 * created by liufeng 2018/7/27
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, DatePicker } from 'antd-mobile'
import "antd-mobile/lib/date-picker/style/css"
import {connect} from "react-redux";
import history from "../router/history";
import api from "../modules/api/api";

import {discoverCategoryList} from "../actions/categoryAction";
// import {discoverSingleMenuList} from "../actions/selectionAction";
import {rankingList} from "../actions/rankingAction";
// import {getSpread} from "../actions/homeAction";

import {Carousel, BackTop} from "antd";
import './common/style/home.css'

function CategoryList(props) {
    const {className, style, title, categoryList} = props;
    return (<div style={{...style}} className="category-block">
        <div className="title">
            <i className="icon icon-man"/>
            <span className="name">{title}</span>
            <a href="/category?gender=male" className="more">更多<span className="arrow-more"/></a>
        </div>
        <div className="category-list">
            {categoryList.map((value, index) => {
                return <a key={index} onClick={() => {
                    if (title === "男生") {
                        history.push({
                            pathname: '/category',
                            query: {gender: "male",major:value.name,index:index},
                        });
                    } else if (title === "女生") {
                        history.push({
                            pathname: '/category',
                            query: {gender: "female",major:value.name,index:index},
                        });
                    } else if (title === "出版") {
                        history.push({
                            pathname: '/category',
                            query: {gender: "press",major:value.name,index:index},
                        });
                    }
                }}>
                    <p className="name">{value.name}</p>
                    <p className="bookCount">{value.bookCount}</p>
                </a>;
            })}
        </div>
    </div>);
}

function getImageUrl(curUrl) {
    if (curUrl.indexOf(api.IMG_BASE_URL) != -1) {
        return curUrl;
    }
    return api.IMG_BASE_URL + curUrl;
}

function getLatelyFollower(latelyFollower) {
    if (latelyFollower >= 10000) {
        return (latelyFollower / 10000).toFixed(2) + "万";
    } else {
        return latelyFollower + "";
    }
}

function RankingList(props) {
    const { title, rankList } = props
    return (
        <div className="ranking">
            <div className="ranking-block">
                <div className="title">
                    <i className="icon icon-rank" />
                    <span className="name">{title}</span>
                    <a className="more">全部<span className="arrow-more" /></a>
                </div>
                <div className="ranking-nav">
                    <span id="ranking-man" className="active">男生榜</span>
                    <span className="verticaleLine">|</span>
                    <span id="ranking-female">女生榜</span>
                </div>
                <div className="ranking-list">
                    <div className="male-list">
                        {rankList.map((value, index) => {
                            if (index >= 10)
                                return;
                            return <a key={index} onClick={() => {
                                history.push({
                                    pathname: '/book',
                                    query: {bookId: value._id},
                                });
                            }} className="first">
                                <div className="num-index clearfix" style={{width: 70}}>
                                    <span className="No No1">{index + 1}</span>
                                    <img src={getImageUrl(value.cover)}
                                        className="cover"/>
                                </div>
                                <div className="text-block">
                                    <p className="name">{value.title}</p>
                                    <p className="latelyFollower"><span>{getLatelyFollower(value.latelyFollower)}</span>人气
                                    </p>
                                </div>
                            </a>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

class HomePage extends PureComponent {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //获取小说分类列表
        this.props.getCategoryList()
        //获取小说图片详情排行列表
        this.props.getRankingList("54d42d92321052167dfb75e3")
    }

    render() {
        const { home } = this.props
        return (
            <div className="page-home">
                <BackTop />
                <DatePicker style={{height: 200, width: 100}}>asd</DatePicker>
                <Button>Start</Button>
                <section className="container content">
                    <div className="content-left">
                        <div className="category">
                            <CategoryList title="男生" categoryList={home.tagsState ? home.tags.male : []}/>
                            <CategoryList title="女生" categoryList={home.tagsState ? home.tags.female : []}/>
                            <CategoryList title="出版" categoryList={home.tagsState ? home.tags.press : []}/>
                        </div>
                    </div>
                    <RankingList title="排行榜" rankList={home.chartsDetailBooks}/>
                </section>

            </div>
        )
    }
}

const mapStateToProps = (store) => {
    const {home} = store;
    return {
        home
    }
};

const mapDispatchToProps = (dispatch) => ({
    getCategoryList: () => {
        dispatch(discoverCategoryList())
    },
    getRankingList: (id) => {
        dispatch(rankingList(id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)