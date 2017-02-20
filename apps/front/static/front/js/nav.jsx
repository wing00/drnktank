import React from 'react';
import { Link } from 'react-router';


export default class Nav extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="nav">
                            <Link to="/game"><button type="button" className="btn btn-primary">New Game</button></Link>
                            <Link to="/stats"><button type="button" className="btn btn-primary">Stats</button></Link>

                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}
