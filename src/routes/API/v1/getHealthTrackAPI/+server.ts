import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import {Database} from "$lib/server/database";

export const GET = async ({cookies}: any) => {
    consoleLog("GetAllHealthInfo REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }
    const allHealthInfo = await Database.getHealthTrack();
    if (!allHealthInfo) {
        consoleLog("GetAllHealthInfo RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("GetAllHealthInfo RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(allHealthInfo), {status: 200});
}