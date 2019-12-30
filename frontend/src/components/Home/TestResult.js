import React from 'react';

export const TestResult = (props) => {
    return(
        <div className="test-board-result">
            <div className="test-board-value">
                <h1>{props.value}</h1>
                <span>mb/s</span>
            </div>
            <div className="test-board-value-label">
                {/* {props.label} */}
            </div>
        </div>
    );
};