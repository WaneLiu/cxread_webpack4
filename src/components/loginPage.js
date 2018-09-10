import React, { PureComponent } from 'react'
import '../components/common/style/loginPage.css'
import { Flex, Button, NavBar, Checkbox } from 'antd-mobile'
import {postUrl} from '../modules/constants/ConstData'
import Cookies from 'universal-cookie'
import { login } from '../modules/constants/actionTypes';
import {connect} from 'react-redux'
import history from '../router/history';

const cookies = new Cookies()

class Login extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            password: '',
            alerttext: '',
            open: false,
            loginLabel: '登录',
            signLabel: '注册',
            rememberChecked: false,
            autoLoginChecked: false
        }
    }

    fetchLogin = async(user, password) => {
        try {
          this.setState({
              loginLabel: '登录中'
          })
          let loginPost = {
              method: 'POST',
              cache: 'default',
              body: JSON.stringify({user: user, password: password}),
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              } 
          }
          //发送登录请求
          let res = await fetch(postUrl, loginPost)
          let data = await res.json()
          let loginMessage = data.message
          //登录校验成功
          if (loginMessage === 1) {
              if (this.state.rememberChecked) {
                  cookies.set('user', user)
                  cookies.set('password', password)
                  cookies.set('rememberChecked', true)
              } else {
                cookies.set('user', '')
                cookies.set('password', '')
                cookies.set('rememberChecked', false) 
              }
              if (this.state.autoLoginChecked) {
                  cookies.set('autoLoginChecked', true)
                  cookies.set('falg', 1)
              } else {
                  cookies.set('autoLoginChecked', false)
              }
              //修改redux state 的login值
              this.props.login(user)
              history.push({pathname: '/user'})
          } else {
              
          }
        } catch (error) {
            
        }
    }

    componentWillMount() {
        if (cookies.get('autoLoginChecked') === 'true') {
            if (cookies.get('flag') === '1') {
                this.fetchLogin(cookies.get('user'), cookies.get('password'))
            }
        }
    }

    componentDidMount() {
        if (cookies.get('rememberChecked') === 'true') {
            this.setState({
                user: cookies.get('user'),
                password: cookies.get('password'),
                rememberChecked: true
            })
            if (cookies.get('autoLoginChecked') === 'true') {
                this.setState({
                    autoLoginChecked: true
                })
            } else {
                this.setState({
                    autoLoginChecked: false
                })
            }
        } else {
            this.setState({
                rememberChecked: false
            })
        }
    }

    updateRememberPassword = () => {
        this.setState({
            rememberChecked: !this.state.rememberChecked
        })
    }

    updateAutoLogin = () => {
        this.setState({
            autoLoginChecked: !this.state.autoLoginChecked
        })
    }

    render() {
        const styles = {
            flex: {

            },
            button: {
                width: '80px',
                margin: '15px'
            }
        }
        const CheckboxItem = Checkbox.CheckboxItem

        return (
            <div className="my-content">
               <div className="g-wrap"></div>
               <div className="g-container">
                    <h2>登录</h2>
                    <div className="g-username">
                        <input name="loginPhoneOrEmail" maxLength="64" placeholder="请输入手机号或邮箱" className="input"/>
                        <img className="img-panda" src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png" className="g-username"/>
                    </div>
                    <div className="g-password">
                        <input  name="loginPassword" type="password" maxLength="64" placeholder="请输入密码" className="input"/>
                        <img className="img-panda" src="https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png" className="g-password"/>
                    </div>
                    <img className="img-panda" src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png" className="g-normal"/>
                    <div className="loginOrRegister">

                        <Flex justify="center">
                            <Button type="ghost" style={styles.button}>{this.state.loginLabel}</Button>
                            <Button type="ghost" style={styles.button}>{this.state.signLabel}</Button>
                        </Flex>
                        <Flex justify="center">
                            <CheckboxItem onChange={this.updateRememberPassword}>记住密码</CheckboxItem>
                            <CheckboxItem onChange={this.updateAutoLogin}>自动登录</CheckboxItem>
                        </Flex>
                    </div>
               </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: user => {
        dispatch(login(user))
    }
})

export default  connect(mapDispatchToProps)(Login)