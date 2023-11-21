import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import {DatabaseEvent} from "$lib/server/databaseObjects/DatabaseEvent";
import {ObjectId} from "mongodb";

export const POST = async ({request, cookies}: any): Promise<Response> => {
    consoleLog("register one event REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    // if (!verifyRequest(cookies)) {
    //     return new Response("Unauthorized", {status: 401});
    // }
    // Extract the farm_uid from request
    const {event_id, farm_id} = await request.json();
    const _id = new ObjectId(event_id);

    const register_event = await DatabaseEvent.updateOneEvent(_id,farm_id)
    if (!register_event) {
        consoleLog("RegisterOneEventAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404})
    }

    consoleLog("RegisterOneEventAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(register_event), {status: 200})

}