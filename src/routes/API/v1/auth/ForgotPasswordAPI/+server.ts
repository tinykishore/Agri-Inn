// Forgot Password POST API

import consoleLog, {LEVEL} from "$lib/server/log";

export const POST = async ({request}: any) => {
    consoleLog("ForgotPasswordAPI REQUEST Received", LEVEL.OK)
    // Server Should receive an email JSON object. Extract the email from the request body
    const email = (await request.json()).email;

    // Check if the email is null, undefined, or empty
    if (email === null || email === undefined || email === '') {
        return new Response(JSON.stringify({body: 'Email is required.'}), {status: 400})
    }
    consoleLog("ForgotPasswordAPI API REQUEST: Email is " + email, LEVEL.OK);

    // Step:1 Check if the email is valid

    // Step:2 Check if the email exists in the database

    // Step:3 If so, Generate a token and send it to the user's email

    // Step:4 If not, return a 404 status code

    return new Response(JSON.stringify({body: 'Email sent.'}), {status: 200});

}