import React from 'react';
import { Link } from 'react-router';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';


function getTooltip(name) {
    return (<Tooltip id="tooltip">{name}</Tooltip>);
}

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    saveStats() {
        localStorage.setItem('state', JSON.stringify(this.props.currentState));
    }

    render() {
        return (
            <div className="menu">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                    <OverlayTrigger placement="top" overlay={getTooltip("Sound")}>
                        <button id = "muteBtn" className="btn btn-default" onClick={(i) => this.props.mute()}>
                            {this.props.muted ? (<i className="fa fa-volume-off" aria-hidden="true" />) : (<i className="fa fa-volume-up" aria-hidden="true" />)}
                        </button>
                    </OverlayTrigger>
                    <Link to={{
                        pathname: "/stats",
                        state: this.props.currentState,
                    }}>
                        <OverlayTrigger placement="top" overlay={getTooltip("Stats")}>
                            <button type="button" className="btn btn-info" onClick={(i)=> this.saveStats()}>
                                <i className = "fa fa-bar-chart" aria-hidden="true" />
                            </button>
                        </OverlayTrigger>
                    </Link>
                    <OverlayTrigger placement="top" overlay={getTooltip("Miss")}>
                        <button className = "btn btn-warning"  onClick={(i) => this.props.handle({"miss": true})}>
                             <i className = "fa fa-times" aria-hidden="true" />
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={getTooltip("Undo")}>
                        <button className = "btn btn-default"  onClick={(i) => this.props.undo()}>
                            <i className = "fa fa-undo" aria-hidden="true" />
                        </button>
                    </OverlayTrigger>
                </div>
            </div>
        )
    }
}