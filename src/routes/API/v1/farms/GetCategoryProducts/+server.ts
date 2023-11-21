import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import DatabaseFarm from "$lib/server/databaseObjects/DatabaseFarm";

export const POST = async ({request, cookies}: any): Promise<Response> => {
    consoleLog("GetProductInfoAPI REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }

    // Extract the farm_uid from request
    const {product_category, farm_id} = await request.json();

    const product_info = await DatabaseFarm.getCategoryProduct(product_category, farm_id)
    if (!product_info) {
        consoleLog("GetProductInfoAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404})
    }
    consoleLog("GetProductInfoAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(product_info), {status: 200})

}