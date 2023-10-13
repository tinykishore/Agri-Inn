import consoleLog, {LEVEL} from "$lib/server/log";
import {getMostLikedPosts} from "$lib/server/database_v2";

export const GET = async () => {
    consoleLog("GetMostLikedPostsAPI REQUEST Received", LEVEL.OK);
    const mostLikedPosts = await getMostLikedPosts();
    if (!mostLikedPosts) {
        consoleLog("GetMostLikedPostsAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("GetMostLikedPostsAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(mostLikedPosts), {status: 200});
}