import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import DatabaseFarm from "$lib/server/databaseObjects/DatabaseFarm";

export const POST = async ({request, cookies}: any): Promise<Response> => {
    consoleLog("GetOneFarmProductsAPI REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }
    // Extract the farm_uid from request
    const farm_uid = await request.json();

    const farm_products = await DatabaseFarm.getOneFarmProducts(farm_uid);
    if (!farm_products) {
        consoleLog("GetOneFarmProductsAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404})
    }

    consoleLog("GetOneFarmProductsAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(farm_products), {status: 200})

}