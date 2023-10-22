import {Db, MongoClient, ObjectId} from "mongodb";
import {MONGO_DATABASE, MONGO_URL} from "$env/static/private";
import consoleLog, {LEVEL} from "$lib/server/log";
import type {TypeUserCache} from "$lib/stores/UserCache";

export let databaseConnection: Db | null = null;

let collections: any = {
    "user-account": null,
    "farm-info": null,
    "farm-products": null,
    "forum": null,
    "comment": null,
    "news": null
}

const client: MongoClient = new MongoClient(MONGO_URL, {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000
});

export const initializeDatabaseConnection = async (): Promise<void> => {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        consoleLog("DATABASE LOG: Connected to MongoDB Server", LEVEL.OK)
        databaseConnection = client.db(MONGO_DATABASE);
        collections["user-account"] = databaseConnection.collection("user-account");
        collections["farm-info"] = databaseConnection.collection("farm-info");
        collections["farm-products"] = databaseConnection.collection("farm-products");
        collections["forum"] = databaseConnection.collection("forum");
        collections["comment"] = databaseConnection.collection("comment");
        collections["news"] = databaseConnection.collection("news");

    } catch (error: any) {
        consoleLog(`DATABASE ERROR: ${error.message}`, LEVEL.ERROR);
        databaseConnection = null;
    }
}

export const terminateDatabaseConnection = async (): Promise<void> => {
    for (let key in collections) {
        collections[key] = null;
    }
    databaseConnection = null;
    await client.close();
    consoleLog("DATABASE LOG: Connection to MongoDB Server closed", LEVEL.OK)
}


// export async function getOneFarmProducts(farm_uid: string) {
//     const result = await collections["farm-products"].findOne({"uid": farm_uid});
//     consoleLog(`DATABASE LOG: Getting farm products {` + farm_uid + `} information...`, LEVEL.OK)
//     return result;
// }
//
// export async function getProductInfo(product_id: string) {
//     const result = await collections["farm-products"].findOne({'products.id': product_id});
//     const products = result.products;
//     for (let i: number = 0; i < products.length; i++) {
//         if (products[i].id === product_id) {
//             return products[i];
//         }
//     }
//     return null;
// }
//
//
// export async function insertForumPost(post: any) {
//     return await collections["forum"].insertOne(post);
// }
//
// export async function getAllPost() {
//     const result = await collections["forum"].find({}).toArray();
//     consoleLog("DATABASE LOG: Getting all posts...", LEVEL.OK)
//     return result;
// }
//
// export async function getMostLikedPosts() {
//     const result = await collections["forum"].find({}).sort({like: -1}).limit(3).toArray();
//     consoleLog("DATABASE LOG: Getting all most liked posts...", LEVEL.OK)
//     return result;
// }
//
// export async function getOnePostInfo(post_uid: ObjectId) {
//     const result = await collections["forum"].findOne({_id: post_uid});
//     consoleLog(`DATABASE LOG: Getting post {` + post_uid + `} information...`, LEVEL.OK)
//     return result;
// }
//
// export async function sendPostReply(reply: any) {
//     //insert a new reply to the post not the reply
//     const result = await collections["comment"].insertOne(reply);
//     consoleLog(`DATABASE LOG: Sending reply {` + reply + `} information...`, LEVEL.OK)
//     return result;
//
// }
//
// export async function getAllNewsInfo() {
//     const result = await collections["news"].find({}).toArray();
//     consoleLog("DATABASE LOG: Getting all news information...", LEVEL.OK)
//     return result;
// }

export class Database {
    public static async getUserByEmail(email: string) {
        const result = await collections["user-account"].findOne({"credentials.email": email});
        consoleLog("DATABASE LOG: Getting user by email...", LEVEL.OK)
        return result;
    }

    public static async getUserByUsername(username: string) {
        const result = await collections["user-account"].findOne({"credentials.username": username});
        consoleLog("DATABASE LOG: Getting user by username...", LEVEL.OK)
        return result;
    }

    public static async getUserByObjectID(_id: ObjectId) {
        const result = await collections["user-account"].findOne({_id: _id});
        consoleLog("DATABASE LOG: Getting user by ObjectID...", LEVEL.OK)
        return result;
    }

    public static async getUserCache(_id: ObjectId) {
        consoleLog(`DATABASE LOG: Getting {` + _id + `} cache information...`, LEVEL.OK)
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

    public static async getUserCredentialsByObjectID(_id: ObjectId) {
        const result = await collections["user-account"].findOne({_id: _id});
        consoleLog("DATABASE LOG: Getting user credentials by ObjectID...", LEVEL.OK)
        return result.credentials;
    }

    public static async insertResetPasswordToken(email: string, token: string) {
        const result = await collections["user-account"].updateOne(
            {"credentials.email": email},
            {$set: {"credentials.password_reset_token": token}}
        );
        if (result.modifiedCount === 1) {
            consoleLog("DATABASE LOG: Reset token inserted successfully", LEVEL.OK);
            return true;
        }
        consoleLog("DATABASE LOG: Reset token insertion failed", LEVEL.ERROR);
        return false;
    }
}