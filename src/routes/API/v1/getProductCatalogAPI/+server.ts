import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import DatabaseFarm from "$lib/server/databaseObjects/DatabaseFarm";

export const POST = async ({request, cookies}: any) => {
    consoleLog("get products", LEVEL.OK);

    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }

    const owner_id = await request.json();
    console.log(owner_id.owner_id);
    const success = await DatabaseFarm.getSellingProductCatalog(owner_id.owner_id);
    if (!success) {
        consoleLog("get products RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("get product RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(success), {status: 200});
}