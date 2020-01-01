import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        client: state.Client
    };
};

const Client = (props) => {
    return(
        <div className="client-info">
            <span className="client-info-label">
                Your informations:
            </span>
            <p className="client-info-value">
                IP: {props.client.ip}
            </p>
            <p className="client-info-value">
                Name: {props.client.isp}
                {props.client.country}
            </p>
        </div>
    )
}

export default connect(mapStateToProps)(Client);