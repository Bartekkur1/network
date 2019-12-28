import config from './config';
import { authenticate } from './services/authService';
import WebSocket, { Server, VerifyClientCallbackAsync, Data } from 'ws';
import { handleRequest } from './router';

export interface Message {
    name: string;
    value: string|object;
}

const verifyClient: VerifyClientCallbackAsync = async (info, cb) => {
    let rawUrl = info.req.url;
    let token = rawUrl.replace("/?token=", "");
    let success = await authenticate(token);
    cb(success, success ? 200 : 401);
}

export const webSocketServer = new Server({ 
    port: config.wsPort,
    host: config.host,
    verifyClient: verifyClient
});

export const sendMessage = (message: Message) => {
    // console.log(message);
    webSocketServer.clients.forEach((ws: WebSocket) => {
        ws.send(JSON.stringify(message));
    });
}

console.log(`websocket is runing on ${config.host}:${config.wsPort}`);

webSocketServer.on('connection', (ws: WebSocket) => {
    ws.on('message', (data: Data) => {
        handleRequest(ws, data.toString());
    });
});