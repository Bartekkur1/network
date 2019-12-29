import React, { Component } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { ResultBoard } from './ResultBoard';
import TestBoard from './TestBoard';

export default class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <Navbar />
                <div className="home-board">
                    <TestBoard />
                    <ResultBoard />
                </div>
            </div>
        )
    }
}