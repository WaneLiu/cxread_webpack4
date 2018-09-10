import {combineReducers} from 'redux'
import category from './categoryReducer'
import home from './homeReducer'
import login from './loginAndLogoutReducer'
import read_history from './readHistoryReducer'
const rootReducer = combineReducers({
    category, home, login, read_history
})

export default rootReducer