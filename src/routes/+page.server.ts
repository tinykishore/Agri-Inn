import {redirect} from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "$env/static/private";

/**
 * Extracts the pathname from a URL object.
 *
 * @param {Object} options - An object containing a URL.
 * @returns {Object} An object with the extracted URL pathname.
 */
export async function load({cookies}: any): Promise<void> {
    const token = cookies.get('sessionID');
    if(!token) return;

    const authenticated = jwt.verify(token, JWT_SECRET);
    if (authenticated) {
        throw redirect(307, "/dashboard");
    }
}