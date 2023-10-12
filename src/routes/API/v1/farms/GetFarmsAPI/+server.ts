import consoleLog, {LEVEL} from "$lib/server/log";
import {getAllFarmInfo} from "$lib/server/database";

export const GET = async () => {
    consoleLog("GetFarmsAPI REQUEST Received", LEVEL.OK);
    const allFarmsInfo = await getAllFarmInfo();
    if (!allFarmsInfo) {
        consoleLog("GetFarmsAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("GetFarmsAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(allFarmsInfo), {status: 200});
}