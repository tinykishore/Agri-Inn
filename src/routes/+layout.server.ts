import jwt from "jsonwebtoken";
import {JWT_SECRET} from "$env/static/private";

/**
 * Load user information from cookies and verify the JWT token.
 * THE ONLY USAGE OF THIS LOAD FUNCTION IS TO SET THE USER CACHE.
 * DO NOT USE THIS LOAD FUNCTION TO REDIRECT THE USER.
 * FOR REDIRECTING THE USER, USE THE load FUNCTION IN src/routes/+page.server.ts.
 * FIXME: COME UP WITH A BETTER SOLUTION FOR THIS. THIS IS A TEMPORARY SOLUTION
 *
 * This function just returns the user_id to +layout.ts, which then sets the user cache.
 *
 *
 * @param {Object} options - The options object.
 * @param {Cookies} options.cookies - The cookies object for retrieving the session token.
 * @returns {Promise<{ userObjectID: string | undefined }>} A Promise that resolves with an object containing the user's ID if authenticated or `undefined` if not.
 */
export let load = async ({cookies}: any): Promise<{ userObjectID: string | undefined; }> => {
    // Check if the cookie is found
    const token: string | undefined = cookies.get('sessionID');
    if (!token)
        return {
            userObjectID: undefined
        };

    // If the cookie is found, verify the JWT
    let authenticated: any;
    try {
        authenticated = jwt.verify(token, JWT_SECRET);
    } catch (e) {
        // If the JWT is invalid, return and do nothing
        return {
            userObjectID: undefined
        };
    }

    // If the JWT is valid, return the user ID
    return {
        userObjectID: authenticated._id
    }
}