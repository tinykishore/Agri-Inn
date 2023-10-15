import consoleLog, {LEVEL} from "$lib/server/log";
import {insertForumPost} from "$lib/server/database";
import {verifyRequest} from "$lib/server/utility";

export const POST = async ({request, cookies}: any) => {
    consoleLog("InsertPostAPI REQUEST Received", LEVEL.OK);

    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }

    const post = await request.json();
    const success = await insertForumPost(post);
    if (!success) {
        consoleLog("InsertPostAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("InsertPostAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(success), {status: 200});
}