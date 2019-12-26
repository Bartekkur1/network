import { hash, compare } from 'bcryptjs';
import { sign, decode } from 'jsonwebtoken';
import { getDb } from './dbService';
import { Admin } from '../entity/admin';
import config from '../config';

async function authorize(password: string): Promise<string> {
    let admin = await getAdmin();
    if(await compare(password, admin.password)) {
        return sign({
            exp: (Date.now() / 1000) + (config.jwtExpirationTime * 3_600),
        }, config.jwtSecret);
    }
    else 
        throw new Error("Invalid password");
}

async function getAdmin(): Promise<Admin> {
    let db = await getDb();
    let admin = db.get('admin').value();

    if(admin === undefined)
        throw new Error("Admin account not found - please initialize database");

    return admin;
}

async function authenticate(token: string): Promise<boolean> {
    try {
        return decode(token) !== undefined;
    }
    catch(e) {
        return false;
    }
}

async function changePassword(password: string): Promise<boolean> {
    let newPassword = await hash(password, 10);
    let db = await getDb();
    return await db.get('admin').set("password", newPassword).write() !== undefined;
}

export { authenticate, authorize, getAdmin, changePassword }