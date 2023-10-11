// dynamicNavbar/GetUserDetails POST API

import consoleLog, {LEVEL} from "$lib/server/log";
import {getUserByUsername} from "$lib/server/database";

export const POST = async ({request}: any) => {
    consoleLog("Dynamic Navbar::GetUserDetails REQUEST Received", LEVEL.OK);
    const username = (await request.json()).username;
    const user_details = await getUserByUsername(username);
    return new Response(JSON.stringify(user_details), {status: 200});
}