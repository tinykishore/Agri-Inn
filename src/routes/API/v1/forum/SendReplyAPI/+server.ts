import consoleLog, {LEVEL} from "$lib/server/log";
import {insertForumPost, sendPostReply} from "$lib/server/database";
import {verifyRequest} from "$lib/server/utility";

export const POST = async ({request, cookies}: any) => {
    consoleLog("SendReplyAPI REQUEST Received", LEVEL.OK);

    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }

    const reply = await request.json();
    const success = await sendPostReply(reply);
    if (!success) {
        consoleLog("SendReplyAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("SendReplyAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(success), {status: 200});
}