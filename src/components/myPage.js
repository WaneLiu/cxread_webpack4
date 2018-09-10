import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import history from '../router/history';
import { NavBar, List } from 'antd-mobile';
/**
 * My Page
 */
class My extends PureComponent {
    checkUser = () => {
        if (this.props.login === '未登录') {
            history.push({
                pathname: '/login'
            })
        } else {
            history.push({
                pathname: '/user'
            })
        }
    }

    render() {
        const Item = List.Item
        return (
            <div>
                <NavBar>个人中心</NavBar>
                <List className="user-list">
                    <Item extra={this.props.login} onClick={this.checkUser}>用户名</Item>
                </List>
            </div>
        )
    }
    
}

function mapStateToProps(state) {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps)(My)