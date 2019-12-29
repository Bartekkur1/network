import React from 'react';
import TestProgress from './TestProgress';
import TestGraph from './TestGraph';

export const ResultBoard = (props) => {
    return(
        <div className="result-board">
            <div className="result-board-panel">
                <TestProgress />
            </div>
            <div className="result-board-panel">
                <TestGraph />
            </div>
        </div>
    )
}