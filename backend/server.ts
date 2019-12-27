import config from './config';
import { authenticate } from './services/authService';
import WebSocket, { Server, VerifyClientCallbackAsync, Data } from 'ws';
import { handleRequest } from './router';

const verifyClient: VerifyClientCallbackAsync = async (info, cb) => {
    let rawUrl = info.req.url;
    let token = rawUrl.replace("/?token=", "");
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
    console.log("Client conected");
    ws.send("Hi");
    ws.on('message', (data: Data) => {
        handleRequest(ws, data.toString());
    });
});