import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import {Database} from "$lib/server/database";

export const POST = async ({request, cookies}: any): Promise<Response> => {
    consoleLog("GetOneNewsAPI REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }
    // Extract the news_uid from request
    const news_uid = await request.json();

    const news_info = await Database.getOneNews(news_uid);
    if (!news_info) {
        consoleLog("GetOneNewsAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404})
    }

    consoleLog("GetOneNewsAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(news_info), {status: 200})

}