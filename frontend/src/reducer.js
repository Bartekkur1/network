import { combineReducers } from 'redux'
import Auth from './reducers/auth';
import Loading from './reducers/loading';
import Alert from './reducers/alert';
import Test from './reducers/test';
import Server from './reducers/server';

export default combineReducers({
    Auth,
    Loading,
    Alert,
    Test,
    Server
});