import consoleLog, {LEVEL} from "$lib/server/log";
import {ObjectId} from "mongodb";
import DatabaseAccount from "$lib/server/databaseObjects/DatabaseAccount";

export const POST = async ({request}: any): Promise<Response> => {
    consoleLog("GetPublicProfile REQUEST Received", LEVEL.OK);

    const {_id, username, email} = await request.json();

    const public_profile: PublicProfile | null = await DatabaseAccount.getPublicProfile(
        _id ? new ObjectId(_id) : null,
        username ? username : null,
        email ? email : null
    );

    if (!public_profile) {
        consoleLog("GetOnePostAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404})
    }

    consoleLog("GetOnePostAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(public_profile), {status: 200})

}