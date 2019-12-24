import options from './config';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { store, history } from './store';
import { Router } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

ReactDOM.render((
    <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options.alert}>
            <Router history={history}>
                <Switch>
                    <Route path="/" component={App} />
                </Switch>
            </Router>
        </AlertProvider>
    </Provider>

), document.getElementById('root'));
