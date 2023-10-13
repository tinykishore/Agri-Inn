import consoleLog, {LEVEL} from "$lib/server/log";
import {getAllFarmInfo, insertForumPost} from "$lib/server/database_v2";


export const POST = async ({request}: any) => {
    consoleLog("GetPost REQUEST Received", LEVEL.OK);
    const post = (await request.json());
    const successPost = await insertForumPost(post);
    if (!successPost) {
        consoleLog("GetPostAPI RESPONSE: status 404", LEVEL.ERROR);
        return new Response(null, {status: 404});
    }
    consoleLog("GetPostAPI RESPONSE: status 200", LEVEL.OK);
    return new Response(JSON.stringify(successPost), {status: 200});
}