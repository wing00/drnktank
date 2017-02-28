import styles from './../css/pong.css';
import React from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import Confetti from 'react-confetti';
import Board from './pong_components/board.jsx';
import TopBar from './pong_components/topbar.jsx';
import Menu from './pong_components/menu.jsx';




function calculateWinner (history) {
    let myCupCount = history.myCups.reduce(function(x, y) {return x+y;}, 0);
    let theirCupCount = history.theirCups.reduce(function(x, y) {return x+y;}, 0);

    if(myCupCount == 0) {
        return "Red Team";

    } else if(theirCupCount == 0) {
        return "Blue Team";
    }
    return false;
}

function calculateFire(stats, player) {
    return stats[player].slice(-3).reduce(function(x, y) {return (y > -1) ? x + 1 : x; }, 0) == 3;
}



function playRandomSound(soundType) { 
    let player = $('#player'); 
    let soundsList = JSON.parse(localStorage.getItem(soundType));

    if(soundsList == null) {
        $.getJSON('/sounds/' + soundType, function (json) {
            localStorage.setItem(soundType, JSON.stringify(json));
            //async
            player.find('source')[0].src = json['sounds'][Math.floor(Math.random() * 3)];
            player[0].load();
            player[0].play();

        });
    } else {
        player.find('source')[0].src = soundsList['sounds'][Math.floor(Math.random() * 3)];
        player[0].load();
        player[0].play();
    }
  }


class Game extends React.Component {
    constructor(props) {
        super(props);

        if(this.props.location.state) {
            this.state = this.props.location.state;
        } else {
            this.state = {
                stepNumber: 0,
                history: [{
                    myCups: Array(10).fill(1),
                    theirCups: Array(10).fill(1),
                    stats: [[], [], [], []],
                    queue: [3, 2, 1, 0],
                }],
                muted: false,
            };
        }


    }

    handleClick(data) {
        let history = this.state.history.slice(0, this.state.stepNumber + 1);
        let current = history[history.length - 1];
        const myCups = current.myCups.slice();
        const theirCups = current.theirCups.slice();
        const stats = current.stats.map(function(data) {return data.slice()});
        let queue = current.queue.slice();
        const player = queue.pop();

        if(calculateWinner(current)) {
            return;
        }

        if(data["miss"]) {
            stats[player].push(-1);
            playRandomSound('miss');

        } else {
            stats[player].push(data["cup"]);

            if (data["team"]) {
                theirCups[data["cup"]] = 0;
            } else {
                myCups[data["cup"]] = 0;
            }
            playRandomSound('make');
        }
        if(calculateFire(stats, player)) {
            queue.push(player);
        }
        if(queue.length == 0) {
            queue = [3, 2, 1, 0];
        }

        this.setState({
            history: history.concat([{
                myCups: myCups,
                theirCups: theirCups,
                stats: stats,
                queue: queue,
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

    rematch() {
        this.setState({
            stepNumber:0,
        });
    }

    mute() {
        let player = $('#player'); 
        player[0].muted = !player[0].muted;
        this.setState({
            muted: !this.state.muted,
        });
    }

    render() {
        const history = this.state.history;
        const currentTurn = history[this.state.stepNumber];
        const stats = currentTurn.stats;
        const winner = calculateWinner(currentTurn);
        const player = currentTurn.queue[currentTurn.queue.length - 1];

        let names = JSON.parse(localStorage.getItem("namesList"));

        if(!names) {
            names = ["You", "Partner", "Opponent 1", "Opponent 2"];
        } else {
            names = names['names'];
        }

        const currentPlayer = names[player];



        return (
            <div className="game container">
                {winner && <Confetti />}
                 <div className="row">
                     <TopBar winner={winner}
                             names={names}
                             currentPlayer={currentPlayer}
                             stats={stats}
                             rematch={(i) => this.rematch()}
                     />
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
                    <Menu handle={(i) => this.handleClick(i)}
                          undo={(i) => this.undo()}
                          mute={(i) => this.mute()}
                          muted={this.state.muted}
                          currentState={this.state}
                    />
                </div>
            </div>
        );
    }
}
export default Game;
