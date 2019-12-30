import React from 'react';
import { TestResult } from './TestResult';
import { connect } from 'react-redux';
import TestSpeedProgress from './TestSpeedProgress';
import TestProgress from './TestProgress';

const mapStateToProps = (state) => {
    return {
        test: state.Test
    };
};

const TestBoard = (props) => {
    return(
        <div className="test-board">
            <div className="test-board-group">
                <TestResult value={props.test.download} label="download"/>
                <TestProgress label="Download" progress={props.test.downloadProgress}/>
            </div>
            <TestSpeedProgress download={props.test.download} upload={props.test.upload} />
            <div className="test-board-group">
                <TestResult value={props.test.upload} label="upload"/>
                <TestProgress label="Upload" progress={props.test.uploadProgress}/>
            </div>
        </div>
    );
} 

export default connect(mapStateToProps)(TestBoard);