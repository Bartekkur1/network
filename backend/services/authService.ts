import { hash, compare } from 'bcryptjs';
import { getDb } from './dbService';
import { Admin } from '../entity/admin';
import { sign, decode } from 'jsonwebtoken';
import config from '../config';

async function authorize(password: string): Promise<string> {
    let admin = await getAdmin();
    if(await compare(password, admin.password))
        return sign({
            exp: (Date.now() + config.jwtExpirationHours * 3600),
        }, config.jwtSecret);
    else 
        throw new Error("Invalid login or password");
}

async function authenticate(token: string): Promise<boolean> {
    try {
        let decoded = await decode(token);
        return decoded !== undefined;
    }
    catch(e) {
        return false;
    }
}

async function getAdmin(): Promise<Admin> {
    let db = await getDb();
    let admin = db.get('admin').value();

    if(admin === undefined)
        throw new Error("Admin account not found - please initialize database");

    return admin;
}

async function changePassword(password: string): Promise<boolean> {
    let newPassword = await hash(password, 10);
    let db = await getDb();
    return await db.get('admin').set("password", newPassword).write() !== undefined;
}

export { authorize, getAdmin, changePassword, authenticate }