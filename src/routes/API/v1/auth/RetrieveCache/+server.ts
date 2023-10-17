import consoleLog, {LEVEL} from "$lib/server/log";
import {getUserDataForCacheRetrieve} from "$lib/server/database";
import {verifyRequest} from "$lib/server/utility";
import {ObjectId} from "mongodb";
import type {TypeUserCache} from "$lib/stores/UserCache";

export const POST = async ({request, cookies}: any): Promise<Response> => {
    consoleLog("RetrieveCache REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }

    // Extract the id from request and convert it to ObjectId (_id)
    const id: any = await request.json();
    const _id: ObjectId = new ObjectId(id);

    // Retrieve the cacheData from database
    const cacheData: TypeUserCache = await getUserDataForCacheRetrieve(_id);

    if (!cacheData) {
        consoleLog("RetrieveCache RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404})
    }

    consoleLog("RetrieveCache RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(cacheData), {status: 200})

}