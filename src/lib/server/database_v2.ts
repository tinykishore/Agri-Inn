import {Db, MongoClient} from "mongodb";
import {MONGO_DATABASE, MONGO_URL} from "$env/static/private";
import consoleLog, {LEVEL} from "$lib/server/log";

export let databaseConnection: Db | null = null;

export let collections: any = {
    "user-account": null,
    "farm-info": null,
    "farm-products": null,
    "forum": null
}

const client: MongoClient = new MongoClient(MONGO_URL, {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000
});

export const initializeDatabase = async (): Promise<void> => {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        consoleLog("DATABASE LOG: Connected to MongoDB Server", LEVEL.OK)
        databaseConnection = client.db(MONGO_DATABASE);
        collections["user-account"] = databaseConnection.collection("user-account");
        collections["farm-info"] = databaseConnection.collection("farm-info");
        collections["farm-products"] = databaseConnection.collection("farm-products");
        collections["forum"] = databaseConnection.collection("forum");
    } catch (error: any) {
        consoleLog(`DATABASE ERROR: ${error.message}`, LEVEL.ERROR);
        databaseConnection = null;
    }
}

export const destroyDatabase = async (): Promise<void> => {
    for (let key in collections) {
        collections[key] = null;
    }
    databaseConnection = null;
    await client.close();
    consoleLog("DATABASE LOG: Connection to MongoDB Server closed", LEVEL.OK)
}

export async function getUserByEmail(email: string) {
    const result = await collections["user-account"].findOne({"credentials.email": email});
    consoleLog("DATABASE LOG: Getting user by email...", LEVEL.OK)
    return result;
}

export async function getUserByUsername(username: string) {
    const result = await collections["user-account"].findOne({"credentials.username": username});
    consoleLog("DATABASE LOG: Getting user by username...", LEVEL.OK)
    return result;
}

export async function getAllFarmInfo() {
    const result = await collections["farm-info"].find({}).toArray();
    consoleLog("DATABASE LOG: Getting all farms information...", LEVEL.OK)
    return result;
}

export async function getOneFarmInfo(farm_uid: string) {
    const result = await collections["farm-info"].findOne({"uid": farm_uid});
    consoleLog(`DATABASE LOG: Getting farm {` + farm_uid + `} information...`, LEVEL.OK)
    return result;
}

export async function getOneFarmProducts(farm_uid: string) {
    const result = await collections["farm-products"].findOne({"uid": farm_uid});
    consoleLog(`DATABASE LOG: Getting farm products {` + farm_uid + `} information...`, LEVEL.OK)
    return result;
}

export async function getProductInfo(product_id: string) {
    const result = await collections["farm-products"].findOne({'products.id': product_id});
    const products = result.products;
    for (let i: number = 0; i < products.length; i++) {
        if (products[i].id === product_id) {
            return products[i];
        }
    }
    return null;
}

export async function insertResetPasswordToken(email: string, token: string) {
    const result = await collections["user-account"].updateOne(
        {"credentials.email": email},
        {
            $set: {"credentials.password_reset_token": token}
        });

    if (result.modifiedCount === 1) {
        consoleLog("DATABASE LOG: Reset token inserted successfully", LEVEL.OK);
        return true;
    } else {
        consoleLog("DATABASE LOG: Reset token insertion failed", LEVEL.ERROR);
        return false;
    }
}

export async function insertForumPost(post: Post) {
    return await collections["forum"].insertOne(post);

}

export async function getAllPost() {
    const result = await collections["forum"].find({}).toArray();
    consoleLog("DATABASE LOG: Getting all farms information...", LEVEL.OK)
    return result;
}

export async function getMostLikedPosts() {
    const result = await collections["forum"].find({}).sort({like: -1}).limit(3).toArray();
    consoleLog("DATABASE LOG: Getting all farms information...", LEVEL.OK)
    return result;
}

