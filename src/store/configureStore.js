import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers/indexReducer';
import thunk from 'redux-thunk';

const middlewares = [thunk, createLogger()]

const storeEnhancer = compose(applyMiddleware(...middlewares))

export default createStore(rootReducer, {}, storeEnhancer)