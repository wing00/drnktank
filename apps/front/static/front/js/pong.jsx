import styles from './../css/pong.css';
import React from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';


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

function playRandomSound(soundType) { 
    let player = $('#player'); 
    let soundsList = JSON.parse(localStorage.getItem(soundType));

    if(soundsList) {
        $.getJSON('/sounds/' + soundType, function (json) {
            localStorage.setItem(soundType, JSON.stringify(json));
            soundsList = json;
            //async
            player.find('source')[0].src = soundsList.sounds[Math.floor(Math.random() * 3)];
            player[0].load();
            player[0].play();
        });
    } else {
        player.find('source')[0].src = soundsList.sounds[Math.floor(Math.random() * 3)];
        player[0].load();
        player[0].play();
    }
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

    handleClick(data) {
        let history = this.state.history.slice(0, this.state.stepNumber + 1);
        let current = history[history.length - 1];
        const myCups = current.myCups.slice();
        const theirCups = current.theirCups.slice();
        const stats = current.stats.map(function(data) {return data.slice()});

        if(calculateWinner(current)) {
            return;
        }

        if(data["miss"]) {
            stats[this.state.stepNumber % 4].push(-1);
            playRandomSound('miss');

        } else {
            stats[this.state.stepNumber % 4].push(data["cup"]);

            if (data["team"]) {
                theirCups[data["cup"]] = 0;
            } else {
                myCups[data["cup"]] = 0;
            }
            playRandomSound('make');
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

    mute() {
        let player = $('#player'); 
        let muteButton = $('#muteBtn');
        if (player[0].muted) {
            muteButton.find('i').removeClass('fa fa-volume-off').addClass('fa fa-volume-up');
        }
        else {
            muteButton.find('i').removeClass('fa fa-volume-up').addClass('fa fa-volume-off');
        }
        player[0].muted = !player[0].muted;
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
                        <button id = "muteBtn" className="btn btn-default" onClick={(i) => this.mute()}>
                            <i className="fa fa-volume-up" aria-hidden="true" />
                        </button>
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
