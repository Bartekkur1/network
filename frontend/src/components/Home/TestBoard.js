import React, { Component } from 'react';
import { TestResult } from './TestResult';
import { TestStatus } from './TestStatus';
import { TestProgress } from './TestProgress';

class TestBoard extends Component {

    render() {
        return(
            <div className="test-board">
                <TestResult value={15} label="download"/>
                <TestStatus status="Kek" />
                <TestResult value={9} label="upload"/>
            </div>
        );
    }
}

export default TestBoard;