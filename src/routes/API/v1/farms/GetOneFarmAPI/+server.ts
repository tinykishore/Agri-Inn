import consoleLog, {LEVEL} from "$lib/server/log";
import {getOneFarmInfo} from "$lib/server/database_v2";

export const POST = async ({request}: any): Promise<Response> => {
    consoleLog("GetOneFarmAPI REQUEST Received", LEVEL.OK);
    // Extract the farm_uid from request
    const farm_uid = await request.json();

    const farm_info = await getOneFarmInfo(farm_uid);
    if (!farm_info) {
        consoleLog("GetOneFarmAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404})
    }

    consoleLog("GetOneFarmAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(farm_info), {status: 200})

}