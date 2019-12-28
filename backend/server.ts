import config from './config';
import { authenticate } from './services/authService';
import WebSocket, { Server, VerifyClientCallbackAsync, Data } from 'ws';
import { networkService } from './services/networkService';
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

export const sendMessage = (messages: Message[]|Message, ws: WebSocket = null) => {
    if((messages as []).length === undefined)
        messages = <Message[]>[ messages ];        

    if(ws === null) {
        webSocketServer.clients.forEach((ws: WebSocket) => {
            (messages as Message[]).forEach((message: Message) => {
                ws.send(JSON.stringify(message));
            });
        });
    }
    else {
        (messages as Message[]).forEach((message: Message) => {
            ws.send(JSON.stringify(message));
        });
    }
};

console.log(`websocket is runing on ${config.host}:${config.wsPort}`);

webSocketServer.on('connection', (ws: WebSocket) => {
    let data = networkService.initialData();
    sendMessage(data);
    ws.on('message', (data: Data) => {
        handleRequest(ws, data.toString());
    });
});