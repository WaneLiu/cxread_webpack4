import {Switch, Router, Route,} from 'react-router-dom'
import React from 'react'
import RankPage from '../components/rankPage';
import BookNavBar from '../components/common/common-modules/BookNavBar';
import history from './history';
import Read from '../components/readPage';
import App from '../components/pages';
import Login from '../components/loginPage';
import Book from '../components/bookDetailPage';
const router = () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={BookNavBar}/>
            <Route exact path="/bookshelves" component={BookNavBar} />
            <Route exact path="/recommend" component={BookNavBar} />
            <Route exact path="/rank" component={BookNavBar} />
            <Route exact path="/my" component={BookNavBar} />
            <Route exact path="/search" component={BookNavBar} />
            <Route exact path="/book" component={Book} /> 
            <Route exact path="/ranklist" component={RankPage}/>
            <Route exact path="/read" component={Read} />
            <Route exact path="/page" component={App} />
            <Route exact path="/login" component={Login} />
        </Switch>
    </Router>
)
export default router