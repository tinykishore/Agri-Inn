// Forgot Password POST API

/* MUST READ

    New packages required: nodemailer, crypto-js
    change connectToMongo() and closeMongoConnection() to your own functions
    change the transporter object to your own email provider
    And so on.


 */

import consoleLog, {LEVEL} from "$lib/server/log";
import {fail} from "@sveltejs/kit";
import nodemailer from "nodemailer";
import CryptoJS from "crypto-js";

let transporter = nodemailer.createTransport({
    host: 'SMTP.EXAMPLE-HOST.COM',
    port: 465,
    secure: true,
    auth: {
        user: 'example@email.com',
        pass: 'APP_PASS'
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

export const POST = async ({request}: any) => {
    consoleLog("ForgotPasswordAPI REQUEST Received", LEVEL.OK)
    // Server Should receive an email JSON object. Extract the email from the request body
    const email = (await request.json()).email;

    // Check if the email is null, undefined, or empty
    if (email === null || email === undefined || email === '') {
        return new Response(JSON.stringify({body: 'Email is required.'}), {status: 400})
    }
    consoleLog("ForgotPasswordAPI API REQUEST: Email is " + email, LEVEL.OK);

    if (!validateEmail(email)) return fail(401, {email, emailInvalid: true});

    try {

        const db = await connectToMongo(); // Connect to Mongo
        const collection = db.collection('users'); // Define collection
        const query = {email: email};
        const success = await collection.findOne(query);

        if (success) {

            const jumble = jumbleGenerator(); // Generate a unique code for the user

            const collection = db.collection('lost-tokens'); // Define collection then send the code bound with the email
            const query = {
                email: email,
                token: jumble,
                issueTime: new Date().getTime()
            };
            const success = await collection.insertOne(query);

            if (success) {

                const link = 'https://example.com/lost-password/' + jumble; // Change link

                await sendMail(email, link);

                return new Response(JSON.stringify({body: 'Email sent.'}), {status: 200});

            } else {
                return fail(401, {email, databaseError: true});
            }

        } else {

            // Return fail

        }

    } catch (error) {
        console.log(error);
    } finally {
        await closeMongoConnection(); // Close Mongo connection
    }
}

async function sendMail(to: string, link: string) {

    let html = '<h3>Password reset</h3>' + '<h3>Your link: ' + link + '</h3>' +
        '<p>Click the link above to change your password.</p>' +
        '<p>Link expires in 30 minutes.</p>' +
        '<p>If you did not request a password reset, please ignore this email.</p>' +
        '<p>Regards, Joshboi</p>' +
        '<p style="color: red">Note: Do not share the link with anyone. Not even site admins.</p>';

    const info = await transporter.sendMail({
        from: 'Joshboi <password-reset@joshboi.xyz>',
        to: to,
        subject: 'Password Reset',
        html: html
    });
}

function jumbleGenerator(): string | null {
    const jumble = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const hash = CryptoJS.MD5(jumble).toString();
    const jumbleArray = hash.match(/.{1,4}/g);
    if (jumbleArray) return jumbleArray.join('-');
    return null;
}

function validateEmail(email: string): boolean {
    const emailRegex = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
    return emailRegex.test(email);
}