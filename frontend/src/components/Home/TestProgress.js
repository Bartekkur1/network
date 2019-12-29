import React from 'react';
import { connect } from 'react-redux';
import TestSpeedProgress from './TestSpeedProgress';

const mapStateToProps = (state) => {
    return {
        test: state.Test
    };
};

const TestProgress = (props) => {
    return(
        <div className="test-board-progress">
            <div className="test-board-progress-container">
                <TestSpeedProgress download={props.test.download} upload={props.test.upload} />
                <div className="test-board-progress-node">
                    Download: {props.test.downloadProgress}%
                    <div style={{background: `linear-gradient(to right, #4dafff ${props.test.downloadProgress}%, #ffffff ${0}%)`}}
                        className="test-board-progress-bar"></div>
                </div>
                <div className="test-board-progress-node">
                    Upload: {props.test.uploadProgress}%
                    <div style={{background: `linear-gradient(to right, #4dafff ${props.test.uploadProgress}%, #ffffff ${0}%)`}}
                        className="test-board-progress-bar"></div>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(TestProgress);