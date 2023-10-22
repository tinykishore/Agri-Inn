import consoleLog, {LEVEL} from "$lib/server/log";
import {getOnePostInfo} from "$lib/server/database";
import {verifyRequest} from "$lib/server/utility";
import {ObjectId} from "mongodb";

export const POST = async ({request, cookies}: any): Promise<Response> => {
    consoleLog("GetOnePostAPI REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }
    // Extract the post_uid from request
    const post_uid = await request.json();
    //convert post_id into object id
    const post_id = new ObjectId(post_uid);

    const post_detail = await getOnePostInfo(post_id);
    if (!post_detail) {
        consoleLog("GetOnePostAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404})
    }

    consoleLog("GetOnePostAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(post_detail), {status: 200})

}