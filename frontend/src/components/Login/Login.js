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
            <div className="login_container">
                <div className="header_container">
                    <h1>Network</h1>
                    <div className="header_logo">
                        <FontAwesomeIcon icon="signal" size="2x"/>
                    </div>
                </div>
                <div className="loginpanel_form">
                    <div className="loginpanel_form_group">
                        <label className="loginpanel_label" htmlFor="login" >Login: </label>
                        <input className="loginpanel_input" type="text" name="login" placeholder="Admin" onChange={e => this.change(e)} />
                    </div>
                    <div className="loginpanel_form_group">
                        <label className="loginpanel_label" htmlFor="password" >Password: </label>
                        <input className="loginpanel_input" type="password" name="password" placeholder="secretPassword123" onChange={e => this.change(e)} />
                    </div>
                    <button className="form_button" onClick={() => this.login()}>
                        Login
                    </button>
                </div>
            </div>)
    }
}

export default Login;