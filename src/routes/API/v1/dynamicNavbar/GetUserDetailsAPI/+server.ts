import consoleLog, {LEVEL} from "$lib/server/log";
import {getUserByUsername} from "$lib/server/database";

/**
 * Handles a POST request to retrieve user details based on the provided username.
 *
 * @param {Object} options - An object containing the request and other data.
 * @param {Request} options.request - The HTTP request object.
 * @returns {Response} - The HTTP response containing the user details.
 */
export const POST = async ({request}: any): Promise<Response> => {
    // Log that a request to retrieve user details has been received.
    consoleLog("Dynamic Navbar :: GetUserDetailsAPI REQUEST Received", LEVEL.OK);

    // Retrieve the username from the request's JSON data.
    const username = (await request.json()).username;

    // Get the user details by the provided username.
    const user_details = await getUserByUsername(username);

    // Create a response containing the user details in JSON format with a 200 status code.
    return new Response(JSON.stringify(user_details), {status: 200});
}