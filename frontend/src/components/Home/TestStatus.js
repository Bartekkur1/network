import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TestStatus = (props) => {
    return(
        <div className="test-board-status">
            <div className="test-board-button">
                <FontAwesomeIcon icon="play" size="4x" />
            </div>
            <div className="test-board-status-label">
                status: <span className="status-label-color">{props.status}</span>
            </div>
        </div>
    )
}