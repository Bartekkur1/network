import React, { Component } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Auth } from '../../api/auth';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: ""
        };
    }

    login() {
        Auth.authorize(this.state.login, this.state.password);
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="login-container">
                <div className="header-container">
                    <h1>Network</h1>
                    <div className="header-logo">
                        <FontAwesomeIcon icon="signal" size="2x"/>
                    </div>
                </div>
                <div className="loginpanel-form">
                    <div className="loginpanel-form-group">
                        <label className="loginpanel-label" htmlFor="login" >Login: </label>
                        <input className="loginpanel-input" type="text" name="login" placeholder="Admin" onChange={e => this.change(e)} />
                    </div>
                    <div className="loginpanel-form-group">
                        <label className="loginpanel-label" htmlFor="password" >Password: </label>
                        <input className="loginpanel-input" type="password" name="password" placeholder="secretPassword123" onChange={e => this.change(e)} />
                    </div>
                    <button className="form-button" onClick={() => this.login()}>
                        Login
                    </button>
                </div>
            </div>)
    }
}

export default Login;