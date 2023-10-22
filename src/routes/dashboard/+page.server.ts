import {redirect} from "@sveltejs/kit";
import {invalidateUserCache} from "$lib/client/utility";
import {isAuthorized} from "$lib/server/utility";

export const load = async ({cookies}: any) => {
    // Get cookie value "sessionID"
    const sessionID = cookies.get('sessionID');
    const authorized = isAuthorized(sessionID);
    // If the JWT is valid, return the username
    return {
        userObjectID: authorized._id,
    }
}

export const actions = {
    default: async ({cookies}: any) => {
        cookies.delete('sessionID');
        invalidateUserCache();
        throw redirect(307, '/');
    }
}