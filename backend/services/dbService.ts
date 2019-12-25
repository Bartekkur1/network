import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { Admin } from '../entity/admin';
import * as fs from "fs";
import config from '../config';
import { hashSync } from 'bcryptjs';

interface DbSchema {
    admin: Admin
}

let db: low.LowdbSync<DbSchema>;

export async function initDatabase(): Promise<void> {
    db = await getAdapter();
    db.defaults({
        admin: {
            login: config.login,
            password: hashSync(config.password, 10)
        }
    }).write();
}

export async function getDb(): Promise<low.LowdbSync<DbSchema>> {
    if(db === undefined && dbFileExists())
        db = await getAdapter();
    
    if(dbFileExists()) {
        return db;
    }
    else {
        await initDatabase();
        return db;
    }
}

async function getAdapter(): Promise<low.LowdbSync<DbSchema>> {
    return low(new FileSync<DbSchema>('db.json'))
}

function dbFileExists() {
    return fs.existsSync('db.json');
}