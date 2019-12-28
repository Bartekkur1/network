import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { Admin } from '../entity/admin';
import { Server } from '../entity/server';
import { Client } from '../entity/client';
import { Result } from '../entity/result';
import * as fs from "fs";
import config from '../config';
import { hashSync } from 'bcryptjs';

export interface DbSchema {
    admin: Admin,
    servers: Server[],
    testServer: Server,
    client: Client,
    results: Result[]
}

let db: low.LowdbSync<DbSchema>;

export function initDatabase(): void {
    db = getAdapter();
    db.defaults({
        admin: {
            login: config.login,
            password: hashSync(config.password, 10)
        },
        servers: [],
        testServer: null,
        client: null,
        results: []
    }).write();
}

export function getDb(): low.LowdbSync<DbSchema> {
    if(db === undefined && dbFileExists())
        db = getAdapter();
        
    return db;
}

function getAdapter(): low.LowdbSync<DbSchema> {
    return low(new FileSync<DbSchema>('db.json'))
}

function dbFileExists() {
    return fs.existsSync('db.json');
}