import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/js/bootstrap.js';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
import Game from './pong.jsx';


class Index extends React.Component {
    render() {
        return (
            <div>
                <ul role="nav">
                    <li><Link to="/game">New Game</Link></li>
                    <li><Link to="/stats">Stats</Link></li>
                </ul>
            </div>
        )
    };
}

class Stats extends React.Component {
    render() {
        return (
            <div>
                <h1>Stats</h1>
            </div>
        )
    };
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Index}/>
        <Route path="/game" component={Game}/>
        <Route path="/stats" component={Stats}/>
    </Router>
    ),
    document.getElementById('app')
);
