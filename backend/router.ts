import WebSocket from "ws";

export function handleRequest(ws: WebSocket, message: string) {
    console.log(JSON.parse(message));
}