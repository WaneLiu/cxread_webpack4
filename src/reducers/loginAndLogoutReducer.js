import {LOGIN, LOGOUT} from '../modules/constants/actionTypes'

function login(state = '未登录', action) {
    switch (action.type) {
        case LOGIN:
          return action.user
        case LOGOUT:
          return '未登录'
        default:
          return state
      }
}

export default login