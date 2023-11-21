import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import DatabaseFarm from "$lib/server/databaseObjects/DatabaseFarm";

export const POST = async ({request, cookies}: any): Promise<Response> => {
    consoleLog("GetOneNewsAPI REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }
    // Extract the farm_uid from request
    const farm_uid = await request.json();

    const farm_info = await DatabaseFarm.getOneFarm(farm_uid);
    if (!farm_info) {
        consoleLog("GetOneNewsAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404})
    }

    consoleLog("GetOneNewsAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(farm_info), {status: 200})

}