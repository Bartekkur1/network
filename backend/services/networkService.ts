const speedtest = require('speedtest-net');
import { sendMessage, Message } from '../server';
import { Server } from '../entity/server';
import { getDb, DbSchema } from './dbService';
import low from "lowdb";
import { Client } from '../entity/client';
import { Result } from '../entity/result';

type serviceStatus = "RUNING" | "WAITING";

export const networkService = {
    test: <any>null,
    status: <serviceStatus>"WAITING",
    init: () => {
        networkService.status = "RUNING";
        networkService.runTest();
    },
    runTest: () => {
        networkService.test = speedtest({ maxTime: 5000 });
        networkService.pinHandlers();
    },
    pinHandlers: () => {
        let db = getDb();
        networkService.test.on('bestservers', (servers: any) => 
            networkService.handleBestServers((servers as Server[]), db));
        networkService.test.on('testserver', (server: any) => 
            networkService.handleTestServer((server as Server), db));
        networkService.test.on('downloadprogress', (speed: any) =>
            networkService.handleProgress(speed, "download"));
        networkService.test.on('uploadprogress', (speed: any) =>
            networkService.handleProgress(speed, "upload"));
        networkService.test.on('data', (data: any) => 
            networkService.handleResult(data, db));
        networkService.test.on('config', (config: any) => 
            networkService.handleConfig(config, db));
    },
    handleResult: (data: any, db: low.LowdbSync<DbSchema>) => {
        let results = db.get('results');
        let date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
        let result = { 
            ...rawDataToReult(data), 
            date: date 
        };
        results.push(result).write();
        sendMessage(<Message>{
            name: "testResult",
            value: result
        });
    },
    handleConfig: (config: any, db: low.LowdbSync<DbSchema>) => {
        db.set('client', rawDataToClient(config)).write();
        sendMessage(<Message>{
            name: "clientInfo",
            value: config.client
        });
    },
    handleProgress: (speed: number, type: "upload" | "download") => {
        sendMessage(<Message>{
            name: type,
            value: "" + speed
        });
    },
    handleBestServers: (servers: Server[], db: low.LowdbSync<DbSchema>) => {
        let serversDb = db.get('servers');
        for(let server of servers) {
            let exists = serversDb
                .find(s => s.id === server.id)
                .value() !== undefined;

            if(!exists)
                serversDb.push(server).write();
        }
        sendMessage(<Message> {
            name: "bestServers",
            value: serversDb.value()
        });
    },
    handleTestServer: (server: Server, db: low.LowdbSync<DbSchema>) => {
        db.set('testServer', server).write();
        sendMessage(<Message>{
            name: "testServer",
            value: server
        });
    },
    stopTest: () => {

    },
}

function rawDataToReult(data: any): Result {
    let speeds = data.speeds;
    let server = data.server;
    return <Result>{
        download: speeds.download,
        upload: speeds.upload,
        serverId: server.id
    };
}

function rawDataToClient(data: any): Client {
    let client = data.client;
    return <Client>{
        ip: client.ip,
        country: client.country,
        isp: client.isp,
        lat: client.lat,
        lon: client.lon
    }
}