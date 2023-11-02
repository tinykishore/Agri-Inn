import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import DatabaseForum from "$lib/server/databaseObjects/DatabaseForum";

export const GET = async ({cookies}: any) => {
    consoleLog("GetAllPostAPI REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }
    const allPosts = await DatabaseForum.getAllPosts();
    if (!allPosts) {
        consoleLog("GetAllPostAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("GetAllPostAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(allPosts), {status: 200});
}