import React from 'react';
import { useAlert } from 'react-alert'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        alert: state.Alert
    };
};

function RenderAlert(props) {
    const alert = useAlert();

    if (props.alert.display) {
        alert.show(
            <div style={{ textTransform: "none" }}>{props.alert.message}</div>, 
            { type: props.alert.alertType }
        );
    }

    return (<span style={{ display: "none" }} />);
}

export default connect(mapStateToProps)(RenderAlert);