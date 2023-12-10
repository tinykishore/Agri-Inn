import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import DatabaseFarm from "$lib/server/databaseObjects/DatabaseFarm";

export const POST = async ({request, cookies}: any): Promise<Response> => {
    consoleLog("AddProductInfoAPI REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }

    // Extract the farm_uid from request
    const {product, farm_id} = await request.json();

    const product_info = await DatabaseFarm.addProduct(product, farm_id)
    if (!product_info) {
        consoleLog("AddProductInfoAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404})
    }
    consoleLog("AddProductInfoAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(product_info), {status: 200})

}