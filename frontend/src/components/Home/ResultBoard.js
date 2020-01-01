import React from 'react';
import TestGraph from './TestGraph';
import BestServer from './BestServer';
import Client from './Client';

export const ResultBoard = (props) => {
    return(
        <div className="result-board">
            <div className="result-board-panel">
                <Client />
                <BestServer />
            </div>
            <div className="result-board-panel">
                <TestGraph />
            </div>
        </div>
    )
}