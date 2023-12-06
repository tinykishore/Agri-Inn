import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import DatabaseNews from "$lib/server/databaseObjects/DatabaseNews";
import {ObjectId} from "mongodb";

export const POST = async ({request, cookies}: any): Promise<Response> => {
    consoleLog("GetOneNewsAPI REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }
    // Extract the news_uid from request
    const {_id, news_uid} = await request.json();
    console.log(_id, news_uid)
    let n_id = new ObjectId(_id)

    const news_info = await DatabaseNews.getOneNews(news_uid,n_id);
    if (!news_info) {
        consoleLog("GetOneNewsAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404})
    }

    consoleLog("GetOneNewsAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(news_info), {status: 200})

}