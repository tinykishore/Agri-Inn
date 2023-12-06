import jwt from "jsonwebtoken";
import {JWT_SECRET} from "$env/static/private";
import DatabaseAccount from "$lib/server/databaseObjects/DatabaseAccount";

export const load = async ({cookies, params}: any) => {
    const sessionID = cookies.get('sessionID');
    let decodedSessionID: any;
    decodedSessionID = jwt.verify(sessionID, JWT_SECRET);
    const loggedInUserObjectID = decodedSessionID.userObjectID;
    const urlUsername = params.username;

    // Check if urlUsername exists in database
    const verifyUsernameExists: any = await DatabaseAccount.getUserAccount(null, urlUsername, null);
    if (!verifyUsernameExists) {
        throw new Error("Username does not exist");
    }

    const senderOID = verifyUsernameExists._id.toString();

    const usernameOwner: boolean = await DatabaseAccount.crosscheckUsernameAndObjectID(urlUsername, loggedInUserObjectID);
    if (!usernameOwner) {
        return {
            usernameVerified: false,
            usernameObjectID: senderOID,
            username: params.username
        }
    } else {
        return {
            usernameVerified: true,
            username: params.username
        }
    }

}