import { combineReducers } from 'redux'
import Auth from './reducers/auth';
import Loading from './reducers/loading';
import Alert from './reducers/alert';

export default combineReducers({
    Auth,
    Loading,
    Alert
});