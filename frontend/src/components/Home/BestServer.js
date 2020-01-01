import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        server: state.Server
    };
};

const BestServer = (props) => {
    let name = props.server.sponsor + " " + props.server.country;
    return (
        <div className="test-best-server">
            <span className="client-info-label">Test server information</span>
            {props.server.sponsor === undefined ? <p> Loading... </p> :
                <div>
                    <p className="client-info-value">
                        Name: {name}
                    </p>
                    <p className="client-info-value">
                        Host: {props.server.host}
                    </p>
                    <p className="client-info-value">
                        Ping: {props.server.bestPing.toFixed(0)}
                    </p>
                </div>}
        </div>
    )}

export default connect(mapStateToProps)(BestServer);