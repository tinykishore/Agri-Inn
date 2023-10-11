import {JWT_SECRET} from "$env/static/private";
import jwt from "jsonwebtoken";
import {redirect} from "@sveltejs/kit";

export const load = async ({cookies}: any) => {
    // Get cookie value "sessionID"
    const token = cookies.get('sessionID');

    // If the cookie is not found, redirect to sign-in page
    // Because the user is not authenticated
    if (!token) throw redirect(307, "/sign-in");

    // If the cookie is found, verify the JWT
    const authenticated: any = jwt.verify(token, JWT_SECRET);
    // If the JWT is invalid, redirect to sign-in page
    if (!authenticated) {
        throw redirect(307, "/sign-in");
    }

    // If the JWT is valid, return the username
    return {
        username: authenticated.username
    }
}