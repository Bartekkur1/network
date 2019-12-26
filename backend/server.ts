import config from './config';
import { authenticate } from './services/authService';
import WebSocket, { Server, VerifyClientCallbackAsync, Data } from 'ws';
import { handleRequest } from './router';

const verifyClient: VerifyClientCallbackAsync = async (info, cb) => {
    let token = info.req.headers.authorization.replace(/Bearer /, "");
    let success = await authenticate(token);
    cb(success, success ? 200 : 401);
}

const webSocketServer = new Server({ 
    port: config.wsPort,
    host: config.host,
    verifyClient: verifyClient
});

console.log(`websocket is runing on ${config.host}:${config.wsPort}`);

webSocketServer.on('connection', (ws: WebSocket) => {
    ws.on('message', (data: Data) => {
        handleRequest(ws, data.toString());
    });
});