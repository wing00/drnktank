import React from 'react';

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

export default class Board extends React.Component {
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