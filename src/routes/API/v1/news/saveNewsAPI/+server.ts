import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import {ObjectId} from "mongodb";
import DatabaseForum from "$lib/server/databaseObjects/DatabaseForum";
import DatabaseNews from "$lib/server/databaseObjects/DatabaseNews";

export const POST = async ({request, cookies}: any): Promise<Response> => {
    consoleLog("saveNewsAPI REQUEST Received", LEVEL.OK);

    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }

    const {news_id, user_id} = await request.json();

     console.log(news_id , user_id);

    // const p_id: ObjectId = new ObjectId(postObjectID);

    const success = await DatabaseNews.saveNews(news_id, user_id);

    if (!success) {
        consoleLog("UpvotePostAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("UpvotePostAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(success), {status: 200});
}