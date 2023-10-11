import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "$env/static/private";

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
