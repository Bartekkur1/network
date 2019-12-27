import { hash, compare } from 'bcryptjs';
import { getDb } from './dbService';
import { Admin } from '../entity/admin';
import { sign, decode } from 'jsonwebtoken';
import config from '../config';
import { RequestHandler, Request } from 'express';

export const handleAuthorization: RequestHandler = async (req: Request, res, next) => {
    try {
        if(req.body.password === undefined)
            return res.sendStatus(400);
        let token = await authorize(req.body.password);
        return res.status(200).json({
            token: token
        });
    }
    catch(e) {
        return res.status(400).json({
            error: e.message
        });
    }
}

export async function authorize(password: string): Promise<string> {
    let admin = await getAdmin();
    if(await compare(password, admin.password))
        return sign({
            exp: (Date.now() + config.jwtExpirationHours * 3600),
        }, config.jwtSecret);
    else 
        throw new Error("Invalid login or password");
}

export async function authenticate(token: string): Promise<boolean> {
    try {
        let decoded = await decode(token);
        return decoded !== null;
    }
    catch(e) {
        return false;
    }
}

export async function getAdmin(): Promise<Admin> {
    let db = await getDb();
    let admin = db.get('admin').value();

    if(admin === undefined)
        throw new Error("Admin account not found - please initialize database");

    return admin;
}

export async function changePassword(password: string): Promise<boolean> {
    let newPassword = await hash(password, 10);
    let db = await getDb();
    return await db.get('admin').set("password", newPassword).write() !== undefined;
}