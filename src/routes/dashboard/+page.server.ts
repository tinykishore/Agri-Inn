import {redirect} from "@sveltejs/kit";
import {invalidateUserCache} from "$lib/client/utility";
import {isAuthorized} from "$lib/server/utility";
import consoleLog, {LEVEL} from "$lib/server/log";

export const load = async ({cookies}: any) => {
    // Get cookie value "sessionID"
    const sessionID = cookies.get('sessionID');
    const authorized = isAuthorized(sessionID);
    if (!authorized) {
        consoleLog("User not authorized", LEVEL.ERROR);
        throw redirect(307, "/sign-in");
    }
    consoleLog("User authorized", LEVEL.OK)
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