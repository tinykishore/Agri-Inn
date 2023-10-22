import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import {Database} from "$lib/server/database";
import {ObjectId} from "mongodb";

export const POST = async ({request, cookies}: any): Promise<Response> => {
    consoleLog("IncrementViewCountAPI REQUEST Received", LEVEL.OK);

    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }

    const postObjectID = await request.json();
    const _id = new ObjectId(postObjectID);
    const success = await Database.incrementViewCount(_id);


    if (!success) {
        consoleLog("IncrementViewCountAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("IncrementViewCountAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(success), {status: 200});
}