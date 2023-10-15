import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "$env/static/private";
import consoleLog, {LEVEL} from "$lib/server/log";

export function encryptPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
}

/**
 * Generates a JSON Web Token (JWT) with the specified payload, secret, and expiration time.
 *
 * @param {any} payload - The data payload to be included in the JWT.*
 * @returns {string} A string representing the generated JWT.
 */
export function generateToken(payload: any): string {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '6h'})
}

export function authorized(token: string): boolean {
    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch (e) {
        return false;
    }
}

export function verifyRequest(cookies: any): boolean {
    const sessionID = cookies.get("sessionID");
    let authorized;
    try {
        authorized = jwt.verify(sessionID, JWT_SECRET);
        if (authorized) {
            consoleLog("API Access Granted", LEVEL.OK);
            return true;
        }
    } catch (e) {
        consoleLog("API Access Unauthorized", LEVEL.ERROR);
        return false;
    }
    return false;
}