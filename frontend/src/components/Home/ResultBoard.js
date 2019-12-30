import React from 'react';
import TestGraph from './TestGraph';
import BestServer from './BestServer';

export const ResultBoard = (props) => {
    return(
        <div className="result-board">
            <div className="result-board-panel">
                <BestServer />
            </div>
            <div className="result-board-panel">
                <TestGraph />
            </div>
        </div>
    )
}