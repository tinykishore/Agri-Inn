import consoleLog, {LEVEL} from "$lib/server/log";
import {getAllPost} from "$lib/server/database_v2";

export const GET = async () => {
    consoleLog("GetAllPostAPI REQUEST Received", LEVEL.OK);
    const allPosts = await getAllPost();
    if (!allPosts) {
        consoleLog("GetAllPostAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("GetAllPostAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(allPosts), {status: 200});
}