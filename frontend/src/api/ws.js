import config from '../config';
import { Auth } from './auth';
import { w3cwebsocket } from 'websocket';
import { store } from '../store';
import { ERROR } from '../constans/alertTypes';
import { SHOW_LOADING, HIDE_LOADING, 
    SHOW_ALERT, DOWNLOAD_TEST_PROGRESS, 
    UPLOAD_TEST_PROGRESS, RESET_TEST, 
    RESULT, 
    DOWNLOAD_SPEED_PROGRESS,
    UPLOAD_SPEED_PROGRESS,
    SET_STATUS,
    SET_RESULTS,
    ADD_RESULT} from '../constans/actionTypes';

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
        store.dispatch({ type: RESET_TEST });
    },
    onOpen: () => {
        console.log("Connected");
        Auth.login(ws.token);
        store.dispatch({ type: HIDE_LOADING });
    },
    onMessage: (message) => {
        handleMessage(JSON.parse(message.data));
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

function handleMessage(message) {
    switch (message.name) {
        case 'downloadProgress':
            return store.dispatch({ type: DOWNLOAD_TEST_PROGRESS, value: message.value });
        case 'uploadProgress':
            return store.dispatch({ type: UPLOAD_TEST_PROGRESS, value: message.value });
        case 'resetTest':
            return store.dispatch({ type: RESET_TEST });
        case 'result':
            return store.dispatch({ 
                type: RESULT,
                download: message.value.download, 
                upload: message.value.upload,
                value: message.value
            });
        case 'downloadSpeedProgress':
            return store.dispatch({ type: DOWNLOAD_SPEED_PROGRESS, download: message.value });
        case 'uploadSpeedProgress':
            return store.dispatch({ type: UPLOAD_SPEED_PROGRESS, upload: message.value });
        case 'status':
            return store.dispatch({ type: SET_STATUS, value: message.value });
        case 'results':
            return store.dispatch({ type: SET_RESULTS, value: message.value });
        default:
            console.log(message.name);
    }
    // console.log(message);
}