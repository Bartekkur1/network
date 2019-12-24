import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import './App.css';
import RenderAlert from './Alerts';
import Loading from './Loading';
import SecuredRoute from '../components/Security/SecuredRoute';
import Home from './Home/Home';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignal } from '@fortawesome/free-solid-svg-icons'
library.add( faSignal );

class App extends Component {

    render() {
        return (
            <div>
                <RenderAlert />
                <Loading />
                <BrowserRouter>
                    <Switch>
                        <SecuredRoute>
                            <Route path="/login" component={Login} />
                            <Route exact path="/" component={Home} />
                        </SecuredRoute>
                    </Switch>
                </BrowserRouter>
            </div>)
    }
}

export default App;
