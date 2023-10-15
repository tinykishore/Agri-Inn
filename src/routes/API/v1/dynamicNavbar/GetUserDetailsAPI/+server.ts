import consoleLog, {LEVEL} from "$lib/server/log";
import {getUserByUsername} from "$lib/server/database_v2";
import {verifyRequest} from "$lib/server/utility";

/**
 * Handles a POST request to retrieve user details based on the provided username.
 *
 * @param {Object} options - An object containing the request and other data.
 * @param {Request} options.request - The HTTP request object.
 * @returns {Response} - The HTTP response containing the user details.
 */
export const POST = async ({request, cookies}: any): Promise<Response> => {
    // Log that a request to retrieve user details has been received.
    consoleLog("Dynamic Navbar :: GetUserDetailsAPI REQUEST Received", LEVEL.OK);

    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }

    // Retrieve the username from the request's JSON data.
    const username = (await request.json()).username;

    // Get the user details by the provided username.
    const user_details = await getUserByUsername(username);

    // Create a response containing the user details in JSON format with a 200 status code.
    return new Response(JSON.stringify(user_details), {status: 200});
}