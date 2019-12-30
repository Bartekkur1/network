import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        test: state.Test
    };
};

const TestProgress = (props) => {
    return(
        <div className="test-board-progress">
            <div className="test-board-progress-container">
                <div className="test-board-progress-node">
                    {props.label}: {props.progress}%
                    <div style={{background: `linear-gradient(to right, #4dafff ${props.progress}%, #ffffff ${0}%)`}}
                        className="test-board-progress-bar"></div>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(TestProgress);