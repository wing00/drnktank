import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


let player0 = 1;
let player1 = 3;
let player2 = 3;
let player3 = 2;


const data = [
      {name: 'Team 1', Player0: player0, Player1: -player1},
      {name: 'Team 2', Player2: player2 + player3,  Player3: -player3},
];
// NOTE: Player 1's real score is player 2s score plus the value given to player 1.


export default class Stats extends React.Component {
    constructor() {
        super();
        console.log(this);
    }
    render() {
        return (
            <div className="container">
                {console.log(this.props.location.state)}
                <h2>Stats</h2>
                <BarChart width={600}
                          height={300}
                          data={data}
                          margin={{top: 20, right: 30, left: 20, bottom: 5}}
                >
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="1 1"/>
                    <Legend />
                    <Bar dataKey="Player0" stackId="a" fill="#8884d8" />
                    <Bar dataKey="Player1" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="Player2" stackId="a" fill="#8884d8" />
                    <Bar dataKey="Player3" stackId="a" fill="#82ca9d" />

                </BarChart>
            </div>
        )
    };
}

