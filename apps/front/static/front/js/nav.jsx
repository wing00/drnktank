import React from 'react';
import { Link } from 'react-router';

import styles from './../css/beerfill.css';


export default class Nav extends React.Component {
    setColor(color) {
        $('.title h1').css('background-color', color);
        $('.palette-style').remove();
        $('<style class="palette-style">.btn-circle { box-shadow: 0px 20px '+ color  +'; }</style>').appendTo('head');
    }


    componentDidMount() {
        $('.pour') //Pour Me Another Drink, Bartender!
        .delay(1000)
        .animate({
            height: '360px'}, 1500)
        .delay(1600)
        .slideUp(500);

        $('.liquid') // I Said Fill 'Er Up!
        .delay(2400)
        .animate({
        height: '170px'
        }, 2500);

        $('.beer-foam') // Keep that Foam Rollin' Toward the Top! Yahooo!
    .delay(2400)
    .animate({
      bottom: '200px'
      }, 2500);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="nav">
                            <Link to="/setup"><button type="button" className="btn btn-primary">New Game</button></Link>
                            <Link to={{
                              pathname: "/stats",
                                state: null,
                            }}>
                                <br/>
                                <br/>
                                <button type = "button" className="btn btn-primary">Stats</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-xs-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="palette text-center">
                            <button type="button" className="btn palette-red" onClick={(i) => this.setColor("red")}>
                                <i className="fa fa-fw" aria-hidden="true" />
                            </button>
                            <button type="button" className="btn palette-blue" onClick={(i) => this.setColor("blue")}>
                                 <i className="fa fa-fw" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">



                    </div>
                </div>
            </div>
        )
    };
}
