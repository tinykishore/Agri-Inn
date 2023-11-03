import jwt from "jsonwebtoken";
import {JWT_SECRET} from "$env/static/private";
import DatabaseAccount from "$lib/server/databaseObjects/DatabaseAccount";

export const load = async ({cookies, params}: any) => {
    // Get cookie value "sessionID"
    const sessionID = cookies.get('sessionID');
    let decodedSessionID: any;
    try {
        decodedSessionID = jwt.verify(sessionID, JWT_SECRET);
        const loggedInUserObjectID = decodedSessionID.userObjectID;
        const usernameOwner: boolean = await DatabaseAccount.crosscheckUsernameAndObjectID(params.username, loggedInUserObjectID);
        return {
            usernameOwner,
            username: params.username
        }


    } catch (e) {
        return {
            username: params.username,
            usernameOwner: false
        }
    }
}