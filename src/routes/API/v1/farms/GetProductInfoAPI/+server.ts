import consoleLog, {LEVEL} from "$lib/server/log";
import {getProductInfo} from "$lib/server/database_v2";

export const POST = async ({request}: any): Promise<Response> => {
    consoleLog("GetProductInfoAPI REQUEST Received", LEVEL.OK);
    // Extract the farm_uid from request
    const product_id = await request.json();

    const product_info = await getProductInfo(product_id);
    if (!product_info) {
        consoleLog("GetProductInfoAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404})
    }
    consoleLog("GetProductInfoAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(product_info), {status: 200})

}