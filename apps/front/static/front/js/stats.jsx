import styles from './../css/stats.css';
import React from 'react';
import {Link} from 'react-router';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

function getNames() {
    let names = JSON.parse(localStorage.getItem("namesList"));

    if(!names) {
        names = ["You", "Partner", "Opponent 1", "Opponent 2"];
    } else {
        names = names['names'];
    }
    return names;
}

function getMake(stats) {
    const names = getNames();
    let obj = {name: 'Make %'};

    const make = stats.map(function(data) {
        return data.reduce(function(x, y) {return (y > -1) ? x + 1 : x; }, 0) * 100.0 / data.length;
    });


    for(let i = 0; i < 4; i++) {
        obj[names[i]] = make[i];
    }

    return [obj];
}


function getCalories(stats) {
    const names = getNames();
    const calories = 102 * 2.0 / 10;
    let obj = {name: 'Calories'};
    const make = stats.map(function(data) {
        return data.reduce(function(x, y) {return (y > -1) ? x + 1 : x; }, 0) * calories;
    });


    for(let i = 0; i < 4; i++) {
        obj[names[3 - i]] = make[i];
    }

    return [obj];

}


export default class Stats extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let stats = JSON.parse(localStorage.getItem("stats"));
        let make;
        let calories;
        let names = getNames();


        if(this.props.location.state) {
            const history = this.props.location.state.history;
            const currentTurn = history[history.length - 1];
            stats = currentTurn.stats.map(function(data) {return data.slice()});
            make = getMake(stats);
            calories = getCalories(stats);

        } else if (stats) {
            make = getMake(stats);
            calories = getCalories(stats);
        } else {
            names = ["Player 1, Player 2, Player 3, Player 4"];
            make = [{"name":"Make %","Player 1":66,"Player 2":33,"Player 3":20,"Player 4":100}];
            calories = [{"name":"Calories","Player 4":40.8,"Player 3":40.8,"Player 2":20.4,"Player 1":20.4}];
        }
        return (
            <div className="col-xs-12 col-md-12 col-lg-12 col-xl-12 text-center">
                <div className="chartContainer">
                    <h2>Stats</h2>
                    <h3>Make Percentage</h3>
                    <BarChart width={600}
                              height={300}
                              data={make}
                              margin={{top: 20, right: 0, left: 0, bottom: 20}}
                    >
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="1 1"/>
                        <Legend />

                        <Bar dataKey={names[0]} fill="#82ca9d" />
                        <Bar dataKey={names[1]} fill="#8884d8" />
                        <Bar dataKey={names[2]} fill="#82ca9d" />
                        <Bar dataKey={names[3]} fill="#8884d8" />

                    </BarChart>
                    <h3>Calories Consumed</h3>

                    <BarChart width={600}
                              height={300}
                              data={calories}
                              margin={{top: 20, right: 0, left: 0, bottom: 20}}
                    >
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="1 1"/>
                        <Legend />

                        <Bar dataKey={names[0]} fill="#82ca9d" />
                        <Bar dataKey={names[1]} fill="#8884d8" />
                        <Bar dataKey={names[2]} fill="#82ca9d" />
                        <Bar dataKey={names[3]} fill="#8884d8" />

                    </BarChart>
                    {this.props.location.state ? (
                        <Link to={{
                            pathname: "/game",
                            state: this.props.location.state,
                        }}>
                            <button type="button" className="btn btn-primary">Go Back</button>
                        </Link>
                        ) : (
                            <Link to={{
                            pathname: "/",
                            state: null,
                        }}>
                            <button type="button" className="btn btn-primary">Go Back</button>
                        </Link>
                        )
                    }
                </div>
            </div>
        )
    };
}
