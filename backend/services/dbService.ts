import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { User } from '../entity/User';
import * as fs from "fs";

interface DbSchema {
    users: User[]
}

let adapter: low.AdapterSync<DbSchema>;
let db: low.LowdbSync<DbSchema>;

export const initDatabase = async () => {
    adapter = new FileSync<DbSchema>('db.json');
    db = await low(adapter);
    db.defaults({
        users: []
    }).write();
}

export const getDb = async (): Promise<low.LowdbSync<DbSchema>> => {
    if(fs.existsSync('db.json')) {
        return db;
    }
    else {
        await initDatabase();
        return db;
    }
}
