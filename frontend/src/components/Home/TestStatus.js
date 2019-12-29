import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        test: state.Test
    };
};

const TestStatus = (props) => {
    return(
        <div className="test-board-status">
            <div className="test-board-button">
                <FontAwesomeIcon icon={props.test.state === 'RUNING' ? 'pause' : 'play'} size="4x" />
            </div>
            <div className="test-board-status-label">
                status: <span className="status-label-color">{props.test.state}</span>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(TestStatus);