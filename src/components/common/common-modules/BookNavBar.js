import {TabBar} from "antd-mobile"
import React, { PureComponent } from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import history from '../../../router/history'
import "../style/bookNavBar.css"

//加载网站下方导航栏图标
import bookshelves_unselected from '../image/book_unselected.svg'
import bookshelves_selected from '../image/book_selected.svg'
import recommend_unselected from '../image/recommend_unselected.svg'
import recommend_selected from '../image/recommend_selected.svg'
import rank_unselected from '../image/rank_unselected.svg'
import rank_selected from '../image/rank_selected.svg'
import my_unselected from '../image/my_unselected.svg'
import my_selected from '../image/my_selected.svg'
import Recommend from "../../recommendPage";
import Search from '../../searchPage';
import Rank from "../../rankPage";
import My from "../../myPage";
import Bookshelves from "../../bookshelvesPage";
import Book from "../../bookDetailPage";

class BookNavBar extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: "readtab",
            hidden: false,
            fullScreen: false,
        }
    }

    render() {
        return (
            <Router history={history}>
            <div>
            <div style={this.state.fullScreen ? 
                {position: 'fixed', width: '100%', height: '100%', top: 0} 
                : {position: 'fixed', width: '100%', top: 0, bottom: 0}}
            >
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="书架"
                        key="bookshelves"
                        icon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: `url(${bookshelves_unselected}) center center /  21px 21px no-repeat` }}
                        />
                        }
                        selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: `url(${bookshelves_selected}) center center /  21px 21px no-repeat` }}
                        />
                        }
                        selected={this.state.selectedTab === 'bookshelvesSelected'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'bookshelvesSelected'
                            })
                            history.push("/bookshelves")
                        }}
                        data-seed="logId"
                    >
                        
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${recommend_unselected}) center center /  21px 21px no-repeat` }}
                        />
                        }
                        selectedIcon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${recommend_selected}) center center /  21px 21px no-repeat` }}
                        />
                        }
                        title="精选"
                        key="recommed"
                        selected={this.state.selectedTab === 'recommendSelected'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'recommendSelected'
                            })
                            history.push("/recommend")
                        }}
                        data-seed="logId1"
                    >
                        
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${rank_unselected}) center center /  21px 21px no-repeat` }}
                        />
                        }
                        selectedIcon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${rank_selected}) center center /  21px 21px no-repeat` }}
                        />
                        }
                        title="排行榜"
                        key="rank"
                        selected={this.state.selectedTab === 'rankSelected'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'rankSelected',
                            })
                            history.push("/rank")
                        }}
                    >
                        
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${my_unselected}) center center /  21px 21px no-repeat` }}
                        />}
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${my_selected}) center center /  21px 21px no-repeat` }}
                        />}
                        title="我的"
                        key="my"
                        selected={this.state.selectedTab === 'mySelected'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'mySelected',
                            });
                            history.push("/my")
                        }}
                    >
                        
                    </TabBar.Item>
                </TabBar>
            </div>
            <Switch>
                <Route exact path="/recommend" component={Recommend}/>
                <Route exact path="/search" component={Search}/>
                <Route exact path="/rank" component={Rank} />
                <Route exact path="/my" component={My} />
                <Route exact path="/bookshelves" component={Bookshelves} />
            </Switch>
            </div>
            </Router>
        )
    }
}

export default BookNavBar