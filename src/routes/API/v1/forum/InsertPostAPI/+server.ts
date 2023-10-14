import consoleLog, {LEVEL} from "$lib/server/log";
import {insertForumPost} from "$lib/server/database_v2";

export const POST = async ({request}: any) => {
    consoleLog("InsertPostAPI REQUEST Received", LEVEL.OK);
    const post = await request.json();
    const success = await insertForumPost(post);
    if (!success) {
        consoleLog("InsertPostAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("InsertPostAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(success), {status: 200});
}