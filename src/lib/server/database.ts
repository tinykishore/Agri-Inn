import consoleLog, {LEVEL} from "$lib/server/log";
import type {TypeUserCache} from "$lib/stores/UserCache";
import type {ObjectId} from "mongodb";

let collections: any = {
    "user-account": null,
    "farm-info": null,
    "farm-products": null,
    "forum": null,
    "comment": null,
    "news": null
}

export async function insertForumPost(post: any) {
    return await collections["forum"].insertOne(post);
}

export async function getAllPost() {
    const result = await collections["forum"].find({}).toArray();
    consoleLog("DATABASE LOG: Getting all posts...", LEVEL.OK)
    return result;
}

export async function getMostLikedPosts() {
    const result = await collections["forum"].find({}).sort({like: -1}).limit(3).toArray();
    consoleLog("DATABASE LOG: Getting all most liked posts...", LEVEL.OK)
    return result;
}

export async function getUserDataForCacheRetrieve(_id: ObjectId) {
    consoleLog(`DATABASE LOG: Getting userCacheRetrieval {` + _id + `} information...`, LEVEL.OK)
    const result = await collections["user-account"].findOne({_id: _id});
    const cache: TypeUserCache = {
        full_name: result.full_name,
        email: result.credentials.email,
        username: result.credentials.username,
        profile_picture: result.profile_picture,
        user_role: result.role,
    }

    return cache;
}

export async function getOnePostInfo(post_uid: ObjectId) {
    const result = await collections["forum"].findOne({_id: post_uid});
    consoleLog(`DATABASE LOG: Getting post {` + post_uid + `} information...`, LEVEL.OK)
    return result;
}

export async function sendPostReply(reply: any) {
    //insert a new reply to the post not the reply
    const result = await collections["comment"].insertOne(reply);
    consoleLog(`DATABASE LOG: Sending reply {` + reply + `} information...`, LEVEL.OK)
    return result;

}

export async function getAllNewsInfo() {
    const result = await collections["news"].find({}).toArray();
    consoleLog("DATABASE LOG: Getting all news information...", LEVEL.OK)
    return result;
}