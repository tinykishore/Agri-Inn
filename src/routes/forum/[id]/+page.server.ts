import {redirect} from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "$env/static/private";

export const load = async ({cookies, params}: any) => {
    // Get cookie value "sessionID"
    const sessionID = cookies.get('sessionID');

    // If the cookie is not found, redirect to sign-in page
    // Because the user is not authenticated
    if (!sessionID) throw redirect(307, "/");

    // If the cookie is found, verify the JWT
    let authenticated: any;
    try {
        authenticated = jwt.verify(sessionID, JWT_SECRET);
    } catch (e) {
        console.log(e);
        throw redirect(307, "/sign-in");
    }

    // If the JWT is valid, return the username
    return {
        userObjectID: authenticated.userObjectID,
        postObjectID: params.id,
    }
}