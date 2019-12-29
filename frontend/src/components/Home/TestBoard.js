import React from 'react';
import { TestResult } from './TestResult';
import TestStatus from './TestStatus';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        test: state.Test
    };
};

const TestBoard = (props) => {
    return(
        <div className="test-board">
            <TestResult value={props.test.download} label="download"/>
            <TestStatus status="Kek" />
            <TestResult value={props.test.upload} label="upload"/>
        </div>
    );
} 

export default connect(mapStateToProps)(TestBoard);