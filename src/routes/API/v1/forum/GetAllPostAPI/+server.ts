import consoleLog, {LEVEL} from "$lib/server/log";
import {getAllPost} from "$lib/server/database_v2";
import {verifyRequest} from "$lib/server/utility";

export const GET = async ({cookies}: any) => {
    consoleLog("GetAllPostAPI REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }
    const allPosts = await getAllPost();
    if (!allPosts) {
        consoleLog("GetAllPostAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("GetAllPostAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(allPosts), {status: 200});
}