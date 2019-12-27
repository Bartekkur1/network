import config from '../config';
import { Auth } from './auth';
import { w3cwebsocket } from 'websocket';
import { store } from '../store';
import { ERROR } from '../constans/alertTypes';
import { SHOW_LOADING, HIDE_LOADING, SHOW_ALERT } from '../constans/actionTypes';

export const ws = {
    socket: null,
    token: null,
    connect: async (token) => {
        store.dispatch({ type: SHOW_LOADING });
        let url = "ws://" + config.SERVER_IP + ":" + config.SERVER_WS_PORT + "?token=" + token;
        ws.token = token;
        ws.socket = new w3cwebsocket(url, 'echo-protocol');
        ws.socket.onopen = ws.onOpen;
        ws.socket.onmessage = ws.onMessage;
        ws.socket.onclose = ws.onClose;
        ws.socket.onerror = ws.onError;
    },
    onOpen: () => {
        console.log("Connected");
        Auth.login(ws.token);
        store.dispatch({ type: HIDE_LOADING });
    },
    onMessage: (message) => {
        
    },
    onClose: () => {
        Auth.logout();
        store.dispatch({ type: SHOW_ALERT, message: "Connection to server closed, try again later...", alertType: ERROR });
    },
    onError: () => {
        Auth.logout();
        store.dispatch({ type: SHOW_ALERT, message: "Session expired, please login again...", alertType: ERROR });
        store.dispatch({ type: HIDE_LOADING });
    },
    send: (data) => {
        ws.socket.send(data);
    }
}