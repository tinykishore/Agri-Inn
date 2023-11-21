import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import {DatabaseEvent} from "$lib/server/databaseObjects/DatabaseEvent";

export const GET = async ({cookies}: any) => {
    consoleLog("GetAllEvents REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }
    const events = await DatabaseEvent.getAllEvents();
    if (!events) {
        consoleLog("GetAllEvents RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("GetAllEvents RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(events), {status: 200});
}