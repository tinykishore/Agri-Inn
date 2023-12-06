import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import DatabaseFarm from "$lib/server/databaseObjects/DatabaseFarm";
import DatabaseOthers from "$lib/server/databaseObjects/DatabaseOthers";

export const GET = async ({cookies}: any) => {
    consoleLog("getAllProductsmarketAPI REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }
    const allProductsInfo = await DatabaseOthers.getAllProducts();
    if (!allProductsInfo) {
        consoleLog("GetallProductsmarketAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("GetFarmsAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(allProductsInfo), {status: 200});
}