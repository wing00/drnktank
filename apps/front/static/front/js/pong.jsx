import styles from './../css/pong.css';
import React from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';


function PlayerIcon(props) {
    if(props.current == props.value) {
        return (
            <div className="player current-player">
                {props.value} <br />
                <i className="fa fa-2x fa-user-circle" /> <br />
                {props.stats} <br />
            </div>
        );
    }  else {
        return (
            <div className="player">
                {props.value} <br />
                <i className="fa fa-2x fa-user" /> <br />
                {props.stats} <br />
            </div>
        );
    }
}

function Circle(props) {
    if(props.value) {
        return (
        <button className="btn btn-default btn-circle" onClick={() => props.onClick()}>
        </button>
        );
    } else {
        return (
         <button className="invisible btn btn-default btn-circle" onClick={() => props.onClick()}>
         </button>
        );
    }
}

function calculateWinner (history) {

    let myCupCount = history.myCups.reduce(function(x, y) {return x+y;}, 0);
    let theirCupCount = history.theirCups.reduce(function(x, y) {return x+y;}, 0);

    if(myCupCount == 0) {
        return "Opponents";

    } else if(theirCupCount == 0) {
        return "You";
    }
    return false;
}

function calculateStats(stats, player) {
    return stats[player].reduce(function(x, y) {return x + y;}, 0);
}

class Board extends React.Component {
    renderMyCup(i) {
        const cups = this.props.myCups;
        const info = {"team": 0, "cup":i, "miss":false};
        return <Circle value={cups[i]}  onClick={() => this.props.onClick(info)} />;
    }

    renderTheirCup(i) {
        const cups = this.props.theirCups;
        const info = {"team": 1, "cup":i, "miss":false};
        return <Circle value={cups[i]} onClick={() => this.props.onClick(info)} />;
    }

    render() {
        return (
                <div className="row">
                    <div className="myBoard col-lg-6 col-md-6 col-sm-6 col-xs-12">

                        <div className="board-col">
                            {this.renderMyCup(0)}
                            {this.renderMyCup(1)}
                            {this.renderMyCup(2)}
                            {this.renderMyCup(3)}
                        </div>
                        <div className="board-col">
                            {this.renderMyCup(4)}
                            {this.renderMyCup(5)}
                            {this.renderMyCup(6)}
                        </div>
                        <div className="board-col">
                            {this.renderMyCup(7)}
                            {this.renderMyCup(8)}
                        </div>
                        <div className="board-col">
                            {this.renderMyCup(9)}
                        </div>
                    </div>

                    <div className="theirBoard col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="board-col">
                            {this.renderTheirCup(0)}
                            {this.renderTheirCup(1)}
                            {this.renderTheirCup(2)}
                            {this.renderTheirCup(3)}
                        </div>
                        <div className="board-col">
                            {this.renderTheirCup(4)}
                            {this.renderTheirCup(5)}
                            {this.renderTheirCup(6)}
                        </div>
                        <div className="board-col">
                            {this.renderTheirCup(7)}
                            {this.renderTheirCup(8)}
                        </div>
                        <div className="board-col">
                            {this.renderTheirCup(9)}
                        </div>
                    </div>
                </div>
        );
      }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            stepNumber: 0,
            history: [{
                myCups: Array(10).fill(1),
                theirCups: Array(10).fill(1),
                stats: [[],[],[],[]],
            }]
        };
    }

    getMakeSound() {
        $.getJSON('/sounds/make', function (json) {
            return json;
        });
    }

    getMissSound() {
        $.getJSON('/sounds/miss', function (json) {
            return json;
        });
    }

    handleClick(data) {
        let history = this.state.history.slice(0, this.state.stepNumber + 1);
        let current = history[history.length - 1];
        const myCups = current.myCups.slice();
        const theirCups = current.theirCups.slice();
        const stats = current.stats.slice();

        if(calculateWinner(current)) {
            return;
        }

        if(data["miss"]) {
            stats[this.state.stepNumber % 4].push(0);

        } else {
            stats[this.state.stepNumber % 4].push(1);

            if (data["team"]) {
                theirCups[data["cup"]] = 0;
            } else {
                myCups[data["cup"]] = 0;
            }
        }

        this.setState({
          history: history.concat([{
              myCups: myCups,
              theirCups: theirCups,
              stats: stats,
          }]),
          stepNumber: history.length,
        });
    }

    undo() {
        if(this.state.stepNumber > 0) {
            this.setState({
                stepNumber: this.state.history.length - 2,
            });
        }
    }

    render() {
        const history = this.state.history;
        const currentTurn = history[this.state.stepNumber];
        const stats = currentTurn.stats;
        const winner = calculateWinner(currentTurn);
        let names = ["You", "Partner", "Opponent 1", "Opponent 2"];
        const currentPlayer = names[this.state.stepNumber % 4];

        let status;

        if(winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + currentPlayer;
        }

        return (
            <div className="game container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                        <div className="status">{status}</div>
                    </div>
                </div>
                 <div className="row">
                    <div className="myTeamIcons col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                        <PlayerIcon
                            value={names[0]}
                            current={currentPlayer}
                            stats={calculateStats(stats, 0)}
                            onClick={() => this.props.onClick(names[0])}
                        />
                        <PlayerIcon value={names[1]}
                                    current={currentPlayer}
                                    stats={calculateStats(stats, 1)}
                                    onClick={() => this.props.onClick(names[1])}
                        />
                    </div>
                     <div className="theirTeamIcons col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                        <PlayerIcon value={names[2]}
                                    current={currentPlayer}
                                    stats={calculateStats(stats, 2)}
                                    onClick={() => this.props.onClick(names[2])}
                        />
                        <PlayerIcon value={names[3]}
                                    current={currentPlayer}
                                    stats={calculateStats(stats, 3)}
                                    onClick={() => this.props.onClick(names[3])}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="game-board">
                        <Board myCups={currentTurn.myCups}
                               theirCups={currentTurn.theirCups}
                               onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="menu col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                        <Link to="/stats">
                            <button type="button" className="btn btn-info">
                                <i className = "fa fa-bar-chart" aria-hidden="true" />
                            </button>
                        </Link>
                        <button className = "btn btn-warning" onClick={(i) => this.handleClick({"miss": true})}>
                             <i className = "fa fa-times" aria-hidden="true" />
                        </button>
                        <button className = "btn btn-default" onClick={(i) => this.undo()}>
                            <i className = "fa fa-undo" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Game;
