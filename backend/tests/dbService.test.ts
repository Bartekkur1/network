import { initDatabase, getDb } from '../services/dbService';
import * as fs from "fs";

test('initialize_database', async () => {
    await initDatabase();
    expect(fs.existsSync('db.json')).toBeTruthy();
});

test('database_initialized_value', async () => {
    let db = await getDb();
    let keys = Object.keys(db.value());
    expect(keys.includes("users")).toBeTruthy();
});

test('get_database', async () => {
    let db = await getDb();
    expect(db).not.toBe(undefined);
    expect(db).not.toBe(null);
});