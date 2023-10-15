import {getUserByEmail, getUserByUsername} from "$lib/server/database_v2";
import consoleLog, {LEVEL} from "$lib/server/log";
import bcrypt from "bcrypt";
import {generateToken} from "$lib/server/utility";

/**
 * Sign-in API for authenticating users.
 *
 * @param {Object} options - An object containing the request and other data.
 * @param {Request} options.request - The HTTP request object.
 * @returns {Response} - The HTTP response containing the authentication result.
 */
export const POST = async ({request}: any): Promise<Response> => {
    consoleLog("SignInAPI REQUEST Received", LEVEL.OK)

    // Server Should receive a Credential JSON object
    const credentials: SignInCredentials = await request.json();
    const key: string = credentials.key;
    const password: string = credentials.password;

    // Check if the key is username or email
    const keyIsEmail: boolean = key.includes('@');

    // Define authResult variable, which will be used to determine if the user is authenticated
    let authResult;
    if (keyIsEmail) {
        consoleLog("SignInAPI API REQUEST: key is email", LEVEL.OK)
        // If the key is an email, find the user by email
        authResult = await getUserByEmail(key);
    } else {
        consoleLog("SignInAPI API REQUEST: key is username", LEVEL.OK);
        // If the key is a username, find the user by username
        authResult = await getUserByUsername(key);
    }

    // If the user is not found, return a 401 status code
    if (!authResult) {
        consoleLog("SignInAPI RESPONSE: status 401", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }

    // If the user is found, check if the password is correct
    if (await bcrypt.compare(password, authResult.credentials["password_hash"])) {
        consoleLog("SignInAPI RESPONSE: Password Matched", LEVEL.OK);
        consoleLog("SignInAPI RESPONSE: Sending response with cookie headers", LEVEL.OK);
        // If the password is correct, generate a token and send it back to the client
        const token: string = generateToken({
            _id: authResult._id,
        });
        // Add Cookie Headers to the response with CORS Headers
        // Redirect to the dashboard
        return new Response(
            JSON.stringify({
                full_name: authResult["full_name"],
                username: authResult.credentials["username"],
                email: authResult.credentials["email"],
                profile_picture: authResult["profile_picture"],
                user_role: authResult["role"]
            }),
            {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Set-Cookie': `sessionID=${token}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=21600`
                }
            });
    } else {
        consoleLog("SignInAPI RESPONSE: Password Mismatch", LEVEL.ERROR)
        return new Response(null, {status: 401});
    }
}