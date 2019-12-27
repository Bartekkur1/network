import config from '../config';
import { store } from '../store';
import { SHOW_LOADING, HIDE_LOADING, SHOW_ALERT, LOGIN, LOGOUT } from '../constans/actionTypes';
import { ERROR } from '../constans/alertTypes';

export const Auth = {
    authorize: (login, password) => {
        store.dispatch({ type: SHOW_LOADING });
        fetch(config.API_URL, {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({
                'login': login,
                'password': password
            })
        })
        .then((res) => {
            store.dispatch({ type: HIDE_LOADING });
            res.text()
            .then(txt => {
                let response = JSON.parse(txt);
                if(res.status !== 200) {
                    store.dispatch({ type: SHOW_ALERT, message: response.error, alertType: ERROR });
                }
                else {
                    store.dispatch({ type: LOGIN, token: response.token });
                    localStorage.setItem('auth', txt);
                }
            });
        })
        .catch((res) => {
            store.dispatch({ type: HIDE_LOADING });
            store.dispatch({ type: SHOW_ALERT, message: "Server offline, try again later...", alertType: ERROR });
        })
    },
    logout: () => {
        store.dispatch({ type: LOGOUT });
    },
    login: (token) => {
        store.dispatch({ 
            type: LOGIN,
            token: token, 
        });
    },
    getToken: () => {
        return store.getState().Auth.token;
    }
}