import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import {ObjectId} from "mongodb";
import DatabaseForum from "$lib/server/databaseObjects/DatabaseForum";

export const POST = async ({request, cookies}: any): Promise<Response> => {
    consoleLog("UpvotePostAPI REQUEST Received", LEVEL.OK);

    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }

    const {postObjectID, likerObjectID, alreadyLiked} = await request.json();

    console.log(postObjectID, likerObjectID, alreadyLiked);

    const p_id: ObjectId = new ObjectId(postObjectID);
    const success = await DatabaseForum.votePost(p_id, likerObjectID, alreadyLiked);

    if (!success) {
        consoleLog("UpvotePostAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("UpvotePostAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(success), {status: 200});
}