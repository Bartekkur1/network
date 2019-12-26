import config from './config';
import { authorize } from './services/authService';
import WebSocket, { Server, VerifyClientCallbackAsync, Data } from 'ws';
import { handleRequest } from './router';

const verifyClient: VerifyClientCallbackAsync = async (info, cb) => {
    let password = info.req.headers.password;
    if(password !== undefined) 
        cb(await authorize((password as string)), 200);
    else 
        cb(false, 400);
}

const webSocketServer = new Server({ 
    port: config.port,
    host: config.host,
    verifyClient: verifyClient
});

webSocketServer.on('connection', (ws: WebSocket) => {
    ws.on('message', (data: Data) => {
        handleRequest(ws, data.toString());
    });
});