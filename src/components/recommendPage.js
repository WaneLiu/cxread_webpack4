import React, { PureComponent } from 'react'
//import PropTypes from 'prop-types'
import {SearchBar, NavBar} from 'antd-mobile'
import history from '../router/history'

class Recommend extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            value: "" //搜索的内容，书或作者

        }
        //this.onChange = this.onChange.bind(this)
    }

    onChange= (value) => {
        this.setState({ value });
    };
    //当点击x时
    onClear = (value) => {
        this.setState({
            value: ""
        })
    }
    //当点击键盘搜索时
    onSubmit = (value) => {
        //console.log(value, 'onSubmit')
        history.push({
            pathname: "/search",
            state: {
                text: this.state.value
            }
        })
    }

    render() {
        return (
            <div>
                <NavBar>搜索书名或作者</NavBar>
                <SearchBar
                    value={this.state.value}
                    placeholder="Search"
                    onSubmit={(value) => this.onSubmit(value)}
                    onClear={(value) => this.onClear(value)}
                    //onFocus={() => console.log('onFocus')}
                    //onBlur={() => console.log('onBlur')}
                    onCancel={() => this.setState({value: ""})}
                    showCancelButton
                    onChange={this.onChange}
                />
            </div>
        )
    }
}

export default  Recommend