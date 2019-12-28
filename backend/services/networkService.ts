const speedtest = require('speedtest-net');
import { sendMessage, Message } from '../server';
import { Server } from '../entity/server';
import { getDb, DbSchema, initDatabase } from './dbService';
import low from 'lowdb';
import { Client } from '../entity/client';
import { Result } from '../entity/result';

type serviceStatus = 'RUNING' | 'WAITING';

export const networkService = {
    test: <any>null,
    status: <serviceStatus>'WAITING',
    init: () => {
        networkService.status = 'RUNING';
        initDatabase();
        networkService.runTest();
    },
    runTest: () => {
        networkService.test = speedtest({ maxTime: 5000 });
        networkService.pinHandlers();
    },
    pinHandlers: () => {
        let db = getDb();
        networkService.test.on('bestservers', (servers: any) => 
            networkServiceHandler.handleBestServers((servers as Server[]), db));
        networkService.test.on('testserver', (server: any) => 
            networkServiceHandler.handleTestServer((server as Server), db));
        networkService.test.on('downloadprogress', (speed: any) =>
            networkServiceHandler.handleProgress(speed, 'download'));
        networkService.test.on('uploadprogress', (speed: any) =>
            networkServiceHandler.handleProgress(speed, 'upload'));
        networkService.test.on('data', (data: any) => 
            networkServiceHandler.handleResult(data, db));
        networkService.test.on('config', (config: any) => 
            networkServiceHandler.handleConfig(config, db));
    },
    initialData: () => {
        let db = getDb();

        let client = db.get('client').value();
        let results = db.get('results').value().sort((a, b) => b.id - a.id).slice(0, 20);

        return <Message[]> [{ 
            name: 'clientInfo',
            value: client
        }, {
            name: 'results',
            value: results
        }];
    },
    stopTest: () => {
        networkService.test.removeAllListeners();
    },
}

const networkServiceHandler = {
    handleResult: (data: any, db: low.LowdbSync<DbSchema>) => {
        let results = db.get('results');
        let date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
        let result = <Result>{ 
            ...rawDataToReult(data), 
            date: date,
            id: results.value().length + 1
        };
        results.push(result).write();
        sendMessage(<Message>{
            name: 'result',
            value: result
        });
    },
    handleConfig: (config: any, db: low.LowdbSync<DbSchema>) => {
        db.set('client', rawDataToClient(config)).write();
        sendMessage(<Message>{
            name: 'clientInfo',
            value: config.client
        });
    },
    handleProgress: (speed: number, type: 'upload' | 'download') => {
        sendMessage(<Message>{
            name: type,
            value: '' + speed
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
            name: 'bestServers',
            value: serversDb.value()
        });
    },
    handleTestServer: (server: Server, db: low.LowdbSync<DbSchema>) => {
        db.set('testServer', server).write();
        sendMessage(<Message>{
            name: 'testServer',
            value: server
        });
    },
};

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