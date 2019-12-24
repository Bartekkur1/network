import config from '../config';
import { store } from '../store';
import { SHOW_LOADING, HIDE_LOADING, SHOW_ALERT, LOGIN, LOGOUT } from '../constans/actionTypes';
import { ERROR } from '../constans/alertTypes';

export const Auth = {
    authorize: function (login, password) {
        store.dispatch({ type: SHOW_LOADING });
        fetch(config.API_URL + "/auth/login", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({
                'login': login,
                'password': password
            })
        })
        .then((res) => {
            store.dispatch({ type: HIDE_LOADING });
            if(res.status !== 200) {
                store.dispatch({ type: SHOW_ALERT, message: "Invalid login or password", alertType: ERROR });
            }
            else {
                res.text().then((txt) => {
                    let authData = JSON.parse(txt);
                    store.dispatch({
                        type: LOGIN, jwtToken: authData.token, userId: authData.id
                    });
                    localStorage.setItem('auth', txt);
                });
            }
        })
        .catch((res) => {
            store.dispatch({ type: HIDE_LOADING });
            store.dispatch({ type: SHOW_ALERT, message: "Server offline, try again later...", alertType: ERROR });
        })
    },
    verifyToken: function(token) {
        store.dispatch({ type: SHOW_LOADING });
        fetch(config.API_URL + "/auth/verify", {
            headers: new Headers({ Authorization: `Bearer ${token}` }),
            method: "POST"
        })
        .then((res) => {
            store.dispatch({ type: HIDE_LOADING });
            if(res.status !== 200) {
                store.dispatch({ type: LOGOUT });
                store.dispatch({ type: SHOW_ALERT, alertType: ERROR, message: "Session has expired" });
            }
        })
        .catch((err) => {
            store.dispatch({ type: LOGOUT });
            store.dispatch({ type: SHOW_ALERT, alertType: ERROR, message: "Server offline, try again later..." });
            store.dispatch({ type: HIDE_LOADING });
        });
    },
    logout: function() {
        store.dispatch({ type: LOGOUT });
    },
    getToken: function() {
        return store.getState().Auth.jwtToken;
    }
}