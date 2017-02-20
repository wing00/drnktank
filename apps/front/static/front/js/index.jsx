import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/js/bootstrap.js';
import styles from './../css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Game from './pong.jsx';
import Stats from './stats.jsx';
import Nav from './nav.jsx';


ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Nav}/>
        <Route path="/stats" component={Stats}/>
        <Route path="/game" component={Game}/>
    </Router>
    ),
    document.getElementById('app')
);
