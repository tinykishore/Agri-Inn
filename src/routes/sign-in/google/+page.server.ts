import {error, redirect} from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "$env/static/private";
import {ObjectId} from "mongodb";
import {encryptPassword, generateToken} from "$lib/server/utility";
import DatabaseAccount from "$lib/server/databaseObjects/DatabaseAccount";

export let load = async ({cookies}: any) => {
    const cookie_encrypted_id: any = cookies.get("google_auth");
    let verified: any;
    try {
        verified = jwt.verify(cookie_encrypted_id, JWT_SECRET);
        if (verified) {
            return {
                full_name: verified.full_name,
                email: verified.email,
                profile_picture: verified.profile_picture,
                _id: verified.new_user_id,
                google_id: verified.google_id,
            }
        }
    } catch (e) {
        cookies.delete("google_auth");
        throw error(401, "Unauthorized");
    }
}


export const actions = {
    default: async ({cookies, request}: any) => {
        let authenticated: boolean = false;
        let verified: any;
        try {
            verified = jwt.verify(cookies.get("google_auth"), JWT_SECRET);
            const data = await request.formData();
            const username = data.get('username');
            const password = data.get('password');

            const hashedPassword = encryptPassword(password);

            const _id = new ObjectId(verified.new_user_id);
            // input into database
            const successInSignUp = await DatabaseAccount.completeGoogleSignUp(
                _id,
                username,
                hashedPassword);

            console.log(successInSignUp);

            if (successInSignUp) {
                const token: string = generateToken({
                    userObjectID: verified.new_user_id,
                });
                console.log(token, verified.new_user_id);
                cookies.set("sessionID", token, {
                    path: "/",
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24 * 7,
                });
                authenticated = true;
            }
        } catch (e) {
            throw error(401, "Unauthorized");
        }

        if (authenticated) {
            throw redirect(307, "/dashboard");
        }

    }
}