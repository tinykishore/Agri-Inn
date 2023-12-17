import Database from "$lib/server/Database";
import consoleLog, {LEVEL} from "$lib/server/log";

export default class DatabaseOthers extends Database {
    public static async getGlobalSearchResult(query: string) {
        consoleLog(`DATABASE LOG: Global search query {` + query + `} ...`, LEVEL.OK)
        // Get user _id, full_name, username, profile_picture, email and role
        const user_result = await super.collections["user-account"].find(
            {
                $or: [
                    {"full_name": {$regex: `^${query}`}},
                    {"credentials.username": {$regex: query}},
                    {"credentials.email": {$regex: query}}
                ]
            },
            {
                projection: {
                    _id: 1,
                    full_name: 1,
                    "credentials.email": 1,
                    "credentials.username": 1,
                    profile_picture: 1,
                    role: 1,
                }
            }
        ).toArray();

        const forum_result = await super.collections["forum"].find(
            {
                $or: [
                    {"title": {$regex: `^${query}`}},
                    {"post": {$regex: query}},
                ]
            },
            {
                projection: {
                    _id: 1,
                    title: 1,
                    post: 1,
                    author: 1,
                }
            }
        ).toArray();



        return {
            user_result: user_result,
            forum_result: forum_result
        }
    }

    public static async getNotifications(userObjectID: string) {
        consoleLog(`DATABASE LOG: Get notifications for user {` + userObjectID + `} ...`, LEVEL.OK)
        return await super.collections["notification"].findOne({user_id: userObjectID});
    }

    public static async getSavedItems(userObjectID: string) {
        consoleLog(`DATABASE LOG: Get saved items for user {` + userObjectID + `} ...`, LEVEL.OK)
        return await super.collections["saved_items"].findOne({user_id: userObjectID});
    }

    public static async getAllProducts(): Promise<any> {
        consoleLog("DATABASE LOG: Getting all products information...", LEVEL.OK)
        return await super.collections["marketplace"].find({}).toArray();
    }



}