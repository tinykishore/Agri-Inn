import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import DatabaseFarm from "$lib/server/databaseObjects/DatabaseFarm";
import DatabaseOthers from "$lib/server/databaseObjects/DatabaseOthers";

export const POST = async ({request, cookies}: any) => {
    consoleLog("get saved items", LEVEL.OK);

    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }

    const user_id = await request.json();
    console.log(user_id)

    const success = await DatabaseOthers.getSavedItems(user_id);
    console.log(success)
    if (!success) {
        consoleLog("get saved item RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("get prosaved item RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(success), {status: 200});
}