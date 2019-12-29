import React from 'react';

export const TestProgress = (props) => {
    return(
        <div className="test-board-progress">
            <div className="test-board-progress-container">
                <div className="test-board-progress-node">
                    Upload: {props.upload}%
                    <div style={{background: `linear-gradient(to right, #4dafff ${props.upload}%, #ffffff ${0}%)`}}
                        className="test-board-progress-bar"></div>
                </div>
                <div className="test-board-progress-node">
                    Download: {props.download}%
                    <div style={{background: `linear-gradient(to right, #4dafff ${props.download}%, #ffffff ${0}%)`}}
                        className="test-board-progress-bar"></div>
                </div>
            </div>
        </div>
    )
}