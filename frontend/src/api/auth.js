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

            res.text()
            .then(txt => {
                if(res.status !== 200) {
                    store.dispatch({ type: SHOW_ALERT, message: txt, alertType: ERROR });
                }
                else {
                    let authData = JSON.parse(txt);
                    store.dispatch({
                        type: LOGIN, jwtToken: authData.token
                    });
                    localStorage.setItem('auth', txt);
                }
            });
        })
        .catch((res) => {
            store.dispatch({ type: HIDE_LOADING });
            store.dispatch({ type: SHOW_ALERT, message: "Server offline, try again later...", alertType: ERROR });
        })
    },
    logout: function() {
        store.dispatch({ type: LOGOUT });
    },
    getToken: function() {
        return store.getState().Auth.jwtToken;
    }
}