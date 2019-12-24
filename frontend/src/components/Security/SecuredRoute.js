import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { store } from '../../store';
import { Auth } from '../../api/auth';
import { LOGIN } from '../../constans/actionTypes';

const mapStateToProps = (state) => {
    return {
        auth: state.Auth
    };
};

class SecuredRoute extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            authenticated: false
        }
    }

    async componentDidMount() {
        let authDataRaw = localStorage.getItem('auth');
        if(authDataRaw !== null) {
            let authData = JSON.parse(authDataRaw);
            await Auth.verifyToken(authData.token);
            store.dispatch({ 
                type: LOGIN, 
                jwtToken: authData.token, 
                userId: authData.userId,
            });
        }
    }

    render() {
        if(!this.props.auth.authorized && this.props.location.pathname === "/")
            return <Redirect to="/login" />
        if(this.props.auth.authorized && this.props.location.pathname === "/login")
            return <Redirect to="/" />
        else
            return this.props.children;
    }
}

export default withRouter(connect(mapStateToProps)(SecuredRoute));