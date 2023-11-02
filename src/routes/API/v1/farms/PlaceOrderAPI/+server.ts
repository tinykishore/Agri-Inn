import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import DatabaseForum from "$lib/server/databaseObjects/DatabaseForum";

export const POST = async ({request, cookies}: any) => {
    consoleLog("Confirm Order", LEVEL.OK);

    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }

    const order = await request.json();
    const success = await DatabaseForum.placeOrder(order);
    if (!success) {
        consoleLog("Confirm Order RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("Confirm Order RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(success), {status: 200});
}