import React, { PureComponent } from 'react'
//import PropTypes from 'prop-types'
//import history from '../router/history'
import api from '../modules/api/api'
import { BackTop } from 'antd';
import BookList from './common/common-modules/BookList'

class Search extends PureComponent {
    constructor(props) {
        super(props)
        let data = this.props.location.state
        this.searchText = data ? data.text : "大主宰"
        this.state = {
            searchState: false, //查找的状态，当为true时，表示正在获取服务器的数据
            searchResultsBookDetailList: []//查询到的结果-书籍详情列表
        }
    }
    //
    fetchSearchBooks = async (text) => {
        try {
           this.setState({
               searchState: true,//表示查询中loading
           })
           console.log(api.SEARCH_BOOKS + `?query=${text}`) 
           let res = await fetch(api.SEARCH_BOOKS + `?query=${text}`)
           let data = await res.json()
           this.setState({
               searchResultsBookDetailList: data.books
           })
           //console.log(this.state.searchResultsBookDetailList)
        } catch (error) {
            console.log(error)//todo
        }
    }

    componentDidMount() {
        this.fetchSearchBooks(this.searchText)
    }

    render() {
        let bookList = this.state.searchResultsBookDetailList
        return (
            <div>
                <BackTop />
                { 
                    bookList == false ?
                    <div /> : <BookList bookListData={bookList} />    
                }                
            </div>
        )
    }
}

export default Search