import config from '../config';
import { Auth } from './auth';
import { w3cwebsocket } from 'websocket';

export const ws = {
    socket: null,
    connect: async (token) => {
        let url = "ws://" + config.SERVER_IP + ":" + config.SERVER_WS_PORT + "?token=" + token;
        ws.socket = new w3cwebsocket(url, 'echo-protocol');
        ws.socket.onopen = ws.onOpen;
        ws.socket.onmessage = ws.onMessage;
        ws.socket.onclose = ws.onClose;
        ws.socket.onerror = ws.onError;
    },
    onOpen: () => {
        console.log("Connected");
    },
    onMessage: (message) => {
        
    },
    onClose: () => {

    },
    onError: () => {
        Auth.logout();
    }
}