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
            <div className="nav">
                    <Link to="/game"><button type="button" className="btn btn-primary">New Game</button></Link>
                    <Link to="/stats"><button type="button" className="btn btn-primary">Stats</button></Link>
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
