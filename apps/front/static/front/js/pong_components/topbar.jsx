import React from 'react';
import { Link } from 'react-router';

function PlayerIcon(props) {
    const onFire = props.stats[2];

    if(props.current == props.value) {
        return (
            <div className="player current-player">
                {props.value} <br />
                <i className="fa fa-2x fa-user-circle" /> <br />
                {props.stats[1].map(function(object, num){
                    if (onFire) {
                        return (
                            <i className="fa fa-fire" key={num} />
                        );
                    } else {
                        return (
                            <i className="fa fa-circle" key={num} />
                        );
                    }
                })}
                <br />

                {props.stats[0]} <br />
            </div>
        );
    }  else {
        return (
            <div className="player">
                {props.value} <br />
                <i className="fa fa-2x fa-user" /> <br />
                {props.stats[1].map(function(object, num){
                    if (onFire) {
                        return (
                            <i className="fa fa-fire" key={num} />
                        );
                    } else {
                        return (
                            <i className="fa fa-circle" key={num} />
                        );
                    }
                })}
                <br />
                {props.stats[0]} <br />
            </div>
        );
    }
}

function calculateStats(stats, player) {
    let cupCount = stats[player].reduce(function(x, y) {return (y > -1) ? x + 1 : x;}, 0);
    let lastThree = stats[player].slice(-3).reverse();
    let fireArray = [];
    for (let i = 0; i < lastThree.length ; i++) {
        if (lastThree[i] == -1) {
            break;
        }
        fireArray.push(1);
    }
    let onFire = fireArray.length == 3;

    return [cupCount, fireArray, onFire]
}

export default class TopBar extends React.Component {
     constructor(props) {
         super(props);
     }
     render() {
         return (
             <div className="topBar">
                 <div className="myTeamIcons col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center">
                     <h2>Blue Team</h2>
                     <PlayerIcon
                        value={this.props.names[0]}
                        current={this.props.currentPlayer}
                        stats={calculateStats(this.props.stats, 0)}
                        onClick={() => this.props.onClick(this.props.names[0])}
                     />
                     <PlayerIcon value={this.props.names[1]}
                                current={this.props.currentPlayer}
                                stats={calculateStats(this.props.stats, 1)}
                                onClick={() => this.props.onClick(this.props.names[1])}
                     />
                 </div>
                 <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center">
                     {this.props.winner ? (
                         <div className="statusboard text-center">

                             <h2>{this.props.winner} Wins!</h2>
                             <button type="button" className="btn btn-primary text-center" onClick={(i) => this.props.rematch()}>Rematch</button>
                             <br/><br />
                             <Link to="/setup"><button type="button" className="btn btn-primary text-center">New Game</button></Link>

                         </div>
                         ) : (
                          <div className="statusboard text-center">
                              <h4>Current Shooter<br/>{this.props.currentPlayer}</h4>
                          </div>
                     )}
                 </div>
                 <div className="theirTeamIcons col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center">
                     <h2>Red Team</h2>
                    <PlayerIcon value={this.props.names[2]}
                                current={this.props.currentPlayer}
                                stats={calculateStats(this.props.stats, 2)}
                                onClick={() => this.props.onClick(this.props.names[2])}
                    />
                    <PlayerIcon value={this.props.names[3]}
                                current={this.props.currentPlayer}
                                stats={calculateStats(this.props.stats, 3)}
                                onClick={() => this.props.onClick(this.props.names[3])}
                    />
                </div>
             </div>
         )
     }
}