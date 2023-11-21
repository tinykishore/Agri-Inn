import consoleLog, {LEVEL} from "$lib/server/log";
import {verifyRequest} from "$lib/server/utility";
import DatabaseFarm from "$lib/server/databaseObjects/DatabaseFarm";

export const POST = async ({request, cookies}: any): Promise<Response> => {
    consoleLog("GetInstallmentsAPI REQUEST Received", LEVEL.OK);
    // Protect API from unauthorized access.
    if (!verifyRequest(cookies)) {
        return new Response("Unauthorized", {status: 401});
    }
    // Extract the farm_uid from request
    const user_id = await request.json();

    const installments = await DatabaseFarm.getInstallments(user_id);
    if (!installments) {
        consoleLog("GetInstallmentsAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404})
    }

    consoleLog("GetInstallmentsAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(installments), {status: 200})
}