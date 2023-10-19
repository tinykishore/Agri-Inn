import {redirect} from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "$env/static/private";

/**
 * Load user information from cookies and verify the JWT token for authentication.
 * THE ONLY USAGE OF THIS LOAD FUNCTION IS TO REDIRECT THE USER.
 *
 * @param {Object} options - The options object.
 * @param {Cookies} options.cookies - The cookies object for retrieving the session token.
 * @throws {Error} Throws an error if the JWT verification fails.
 * @returns {Promise<void>} A Promise that resolves with no value when the JWT is valid and the user is redirected to the dashboard page.
 */
export let load = async ({cookies}: any): Promise<void> => {
    // Check if the cookie is found
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