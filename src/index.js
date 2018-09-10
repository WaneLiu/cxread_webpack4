import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
//import registerServiceWorker from './registerServiceWorker';
import R from './router/router'
import store from './store/configureStore'

ReactDOM.render(
    <Provider store={store}>
        <R />
    </Provider>,
document.getElementById('root'));
//registerServiceWorker();
