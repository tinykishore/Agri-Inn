import consoleLog, {LEVEL} from "$lib/server/log";
import {getAllFarmInfo} from "$lib/server/database";
import {verifyRequest} from "$lib/server/utility";

export const GET = async ({cookies}: any) => {
    consoleLog("GetFarmsAPI REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }
    const allFarmsInfo = await getAllFarmInfo();
    if (!allFarmsInfo) {
        consoleLog("GetFarmsAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("GetFarmsAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(allFarmsInfo), {status: 200});
}