import consoleLog, {LEVEL} from "$lib/server/log";
import {getOneFarmProducts} from "$lib/server/database";

export const POST = async ({request}: any): Promise<Response> => {
    consoleLog("GetOneFarmProductsAPI REQUEST Received", LEVEL.OK);
    // Extract the farm_uid from request
    const farm_uid = await request.json();

    const farm_products = await getOneFarmProducts(farm_uid);
    if (!farm_products) {
        consoleLog("GetOneFarmProductsAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404})
    }

    consoleLog("GetOneFarmProductsAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(farm_products), {status: 200})

}