import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        server: state.Server
    };
};

const BestServer = (props) => {
    let name = props.server.sponsor +" "+ props.server.country +" "+ props.server.name;
    return (
        <div className="test-best-server">
            {/* {JSON.stringify(props.server)} */}
            <span className="test-best-server-label">Test server information</span>
            <h1>{props.server.sponsor === undefined ? "Loading..." : name}</h1>
            <span>host: {props.server.host || "Loading..."}</span>
            <span>ping: {props.server.bestPing.toFixed(0)}</span>
        </div>
    )
}

export default connect(mapStateToProps)(BestServer);