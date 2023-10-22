import consoleLog, {LEVEL} from "$lib/server/log";
import {getAllNewsInfo} from "$lib/server/database";
import {verifyRequest} from "$lib/server/utility";

export const GET = async ({cookies}: any) => {
    consoleLog("GetNewsAPI REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }
    const allNewsInfo = await getAllNewsInfo();
    if (!allNewsInfo) {
        consoleLog("GetNewsAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("GetNewsAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(allNewsInfo), {status: 200});
}