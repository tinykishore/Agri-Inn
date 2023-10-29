import consoleLog, {LEVEL} from "$lib/server/log";
import {Database} from "$lib/server/database";

export const POST = async ({request}: any) => {
    consoleLog("GetOnePostAPI REQUEST Received", LEVEL.OK);

    // Extract the post_uid from request
    const {query} = await request.json();

    const search_results = await Database.getGlobalSearchResult(query);

    if (!search_results) {
        consoleLog("GetOnePostAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404})
    }

    consoleLog("GetOnePostAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(search_results), {status: 200})

}