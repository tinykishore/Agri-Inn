import consoleLog, {LEVEL} from "$lib/server/log";

let collections: any = {
    "user-account": null,
    "farm-info": null,
    "farm-products": null,
    "forum": null,
    "comment": null,
    "news": null
}

export async function getAllNewsInfo() {
    const result = await collections["news"].find({}).toArray();
    consoleLog("DATABASE LOG: Getting all news information...", LEVEL.OK)
    return result;
}