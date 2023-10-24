import {redirect} from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "$env/static/private";

export const load = async ({cookies, params}: any) => {
    // Get cookie value "sessionID"
    const token = cookies.get('sessionID');

    // If the cookie is not found, redirect to sign-in page
    // Because the user is not authenticated
    if (!token) throw redirect(307, "/sign-in");

    // If the cookie is found, verify the JWT
    let authenticated: any;
    try {
        authenticated = jwt.verify(token, JWT_SECRET);
    } catch (e) {
        console.log(e);
        throw redirect(307, "/sign-in");
    }

    // If the JWT is valid, return the username
    return {
        _id: authenticated._id,
        farm_uid: params.farm,
    }
}