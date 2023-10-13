// Forgot Password POST API

import consoleLog, {LEVEL} from "$lib/server/log";
import nodemailer from "nodemailer";
import CryptoJS from "crypto-js";
import {GMAIL_APP_PASS} from "$env/static/private";
import {insertResetPasswordToken} from "$lib/server/database_v2";

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'tinykishore@gmail.com',
        pass: GMAIL_APP_PASS
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

export const POST = async ({request}: any) => {
    consoleLog("ForgotPasswordAPI REQUEST Received", LEVEL.OK);
    // Server Should receive an email JSON object. Extract the email from the request body
    const email = (await request.json()).email;
    consoleLog("ForgotPasswordAPI API REQUEST: Email is " + email, LEVEL.OK);

    // FIXME: Email verification will be moved to client side
    // // Check if the email is null, undefined, or empty
    // if (email === null || email === undefined || email === '') {
    //     return new Response(null, {status: 404});
    // }
    // consoleLog("ForgotPasswordAPI API REQUEST: Email is " + email, LEVEL.OK);


    // FIXME: Email verification will be moved to client side
    // // Check if the email exists in the database
    // const emailExists = await getUserByEmail(email);
    //
    // // If the email exists, generate a token and send it to the user
    // if (emailExists) {
    // consoleLog("ForgotPasswordAPI API REQUEST: Email exists", LEVEL.OK);

    // Generate a token
    consoleLog("ForgotPasswordAPI API REQUEST: Generating token...", LEVEL.OK);
    const reset_token: string | null = resetTokenGenerator(); // Generate a unique code for the user

    // Check if the token is null. If it is, return an error
    if (reset_token === null) {
        consoleLog("ForgotPasswordAPI API REQUEST: Token generation failed", LEVEL.ERROR);
        return new Response(null, {status: 500});
    }
    consoleLog("ForgotPasswordAPI API REQUEST: Token generated: " + reset_token, LEVEL.OK);

    // Insert the token into the database
    const successInsertion: boolean = await insertResetPasswordToken(email, reset_token);

    if (successInsertion) {
        consoleLog("ForgotPasswordAPI API REQUEST: Database updated", LEVEL.OK);
        // TODO: Change the link to the actual link
        const link = 'https://example.com/lost-password/' + reset_token;
        await sendMail(email, link);
        return new Response(null, {status: 200});
    } else {
        consoleLog("ForgotPasswordAPI API REQUEST: Email does not exist", LEVEL.ERROR);
        return new Response(null, {status: 500});
    }

    // } else return new Response(null, {status: 404});
}

async function sendMail(to: string, link: string) {
    let html = `
  <div style="font-family: 'Helvetica Neue', sans-serif; text-align: center;">
	<div style="background-color: #f5f5f5; max-width: 500px; margin: 0 auto; padding: 20px; border-radius: 15px; box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);">
		<h2 style="color: #3D220C; font-size: 24px; font-weight: 700">Password Reset</h2>
		<p style="font-size: 16px;font-weight: 700">Click the link below to change your password</p>
		<p style="font-size: 16px;">If you did not request a password reset, please ignore this email</p>
		<a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #3D220C; color: #ffffff; text-decoration: none; font-size: 18px; border-radius: 10px; margin: 10px 0 10px 0; font-weight: 700">Reset Password</a>
		<p style="color: #e53e3e; font-size: 14px; font-weight: bold">Note: Do not share the link with anyone, not even site admins</p>
		<p style="font-size: 16px;color: #737373; font-weight: 600; margin-top: 50px">Regards</p>
		<img src="https://raw.githubusercontent.com/tinykishore/Agri-Inn/development/src/lib/assets/icons/logo.jpg" alt="Logo" style="width: 100px;">
	</div>
</div>
`;

// You can send this HTML in your email.
    const info = await transporter.sendMail({
        from: 'Agri-Inn',
        to: to,
        subject: 'Password Reset | Agri-Inn',
        html: html
    });
}

function resetTokenGenerator(): string | null {
    const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const keyHash = CryptoJS.MD5(key).toString();
    const tokenArray = keyHash.match(/.{1,4}/g);
    if (tokenArray) return tokenArray.join('-');
    return null;
}