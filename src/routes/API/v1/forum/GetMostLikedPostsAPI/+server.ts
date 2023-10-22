import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import {Database} from "$lib/server/database";

export const GET = async ({cookies}: any) => {
    consoleLog("GetMostLikedPostsAPI REQUEST Received", LEVEL.OK);

    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }

    const mostLikedPosts = await Database.getMostLikedPosts();
    if (!mostLikedPosts) {
        consoleLog("GetMostLikedPostsAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("GetMostLikedPostsAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(mostLikedPosts), {status: 200});
}