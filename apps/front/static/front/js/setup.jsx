import React from 'react';
import { Link } from 'react-router';

export default class Setup extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                        <h2>Blue Team</h2>
                        <div className="input-group">
                            <label htmlFor="player0">Player 1</label>
                            <input type="text" className="form-control" id="player0" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="player1">Player 2</label>
                            <input type="text" className="form-control" id="player1" />
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 text-center">
                        <Link to="/game">
                            <button type="button" className="btn btn-primary">Go</button>
                        </Link>
                    </div>
                    <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                        <h2>Red Team</h2>
                        <div className="input-group">
                            <label htmlFor="player0">Player 3</label>
                            <input type="text" className="form-control" id="player2" />
                        </div>
                        <div className="input-group">

                            <label htmlFor="player1">Player 4</label>
                            <input type="text" className="form-control" id="player3" />
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}
