import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import styles from './../css/index.css';
import 'bootstrap/dist/js/bootstrap.js';


let React = require('react');
let ReactDOM = require('react-dom');


function Circle(props) {
    if(props.value) {
        return (
        <button className="btn btn-circle" onClick={() => props.onClick()}>
            {props.value}
        </button>
        );

    } else {
        return (
         <button className="btn hidden" onClick={() => props.onClick()}>
            {props.value}
         </button>
        );
    }
}


class Board extends React.Component {
  renderMyCup(i) {
      const cups = this.props.myCups;
      return <Circle value={cups[i]}  onClick={() => this.props.onClick(i)} />;
  }

  renderTheirCup(i) {
      const cups = this.props.theirCups;
      return <Circle value={cups[i % 10]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    return (
        <div>
            <div className="status">{status}</div>
            <div className="myBoard">
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

            <div className="theirBoard">
                <div className="board-col">
                    {this.renderTheirCup(10)}
                    {this.renderTheirCup(11)}
                    {this.renderTheirCup(12)}
                    {this.renderTheirCup(13)}
                </div>
                <div className="board-col">
                    {this.renderTheirCup(14)}
                    {this.renderTheirCup(15)}
                    {this.renderTheirCup(16)}
                </div>
                <div className="board-col">
                    {this.renderTheirCup(17)}
                    {this.renderTheirCup(18)}
                </div>
                 <div className="board-col">
                    {this.renderTheirCup(19)}
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
            isNext: true,
            history: [{
                myCups: Array(10).fill(1),
                theirCups: Array(10).fill(1),
            }]
        };
    }

    handleClick(e, i) {
        let history = this.state.history.slice(0, this.state.stepNumber + 1);
        let current = history[history.length - 1];
        const myCups = current.myCups.slice();
        const theirCups = current.theirCups.slice();

        if (i < 10) {
            myCups[i] = 0;
        } else {
            theirCups[i % 10] = 0;
        }

        this.setState({
          history: history.concat([{
              myCups: myCups,
              theirCups: theirCups,
          }]),
          stepNumber: history.length,
          isNext: !this.state.isNext,
        });
    }

    render() {
        const history = this.state.history;
        const currentTurn = history[this.state.stepNumber];
        const winner = calculateWinner(currentTurn);

        let status;
        if(winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.isNext ? 'You' : 'Them');
        }

        return (
          <div className="game">
              <div className="status">{ status }</div>
              <div className="game-board">
                  <Board
                      myCups={currentTurn.myCups}
                      theirCups={currentTurn.theirCups}
                      onClick={(i) => this.handleClick(this, i)}
                  />
              </div>
          </div>
        );
    }
}

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);

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
