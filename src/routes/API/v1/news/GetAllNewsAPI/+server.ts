import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import DatabaseNews from "$lib/server/databaseObjects/DatabaseNews";

export const GET = async ({cookies}: any) => {
    consoleLog("GetNewsAPI REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }
    const allNewsInfo = await DatabaseNews.getAllNews();
    if (!allNewsInfo) {
        consoleLog("GetNewsAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("GetNewsAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(allNewsInfo), {status: 200});
}