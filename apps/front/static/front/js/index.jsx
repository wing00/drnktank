import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/js/bootstrap.js';
import styles from './../css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
import Game from './pong.jsx';
import Stats from './stats.jsx';


class Index extends React.Component {
    render() {
        return (
            <div className="nav">
                    <Link to="/game"><button type="button" className="btn btn-primary">New Game</button></Link>
                {this.props.children}
            </div>
        )
    };
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Index}/>
        <Route path="/stats" component={Stats}/>
        <Route path="/game" component={Game}/>

    </Router>
    ),
    document.getElementById('app')
);
