import {redirect} from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "$env/static/private";

/**
 * Loads user data and handles authentication.
 *
 * @param {object} options - An object containing the following properties:
 * @param {object} options.cookies - An object representing the cookies for the request.
 * @returns {Promise<void>} - A Promise that resolves when the loading and authentication process is complete.
 */
export async function load({cookies}: any): Promise<void> {
    const token: string | undefined = cookies.get('sessionID');
    if(!token) return;

    // If the cookie is found, verify the JWT
    let authenticated:any;
    try {
        authenticated = jwt.verify(token, JWT_SECRET);
    } catch (e) {
        // If the JWT is invalid, return and do nothing
        return;
    }

    // If the JWT is valid, redirect to /dashboard page
    if (authenticated) throw redirect(301, "/dashboard");
}