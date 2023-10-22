import {Db, MongoClient, ObjectId} from "mongodb";
import {MONGO_DATABASE, MONGO_URL} from "$env/static/private";
import consoleLog, {LEVEL} from "$lib/server/log";
import type {TypeUserCache} from "$lib/stores/UserCache";

/**
 * The database connection object used to interact with the MongoDB database.
 * Initialized as `null` by default.
 */
let databaseConnection: Db | null = null;

/**
 * An object that stores various collections used for database operations.
 */
let collections: any = {
    "user-account": null,
    "farm-info": null,
    "farm-products": null,
    "forum": null,
    "comment": null,
    "news": null
}

/**
 * The MongoDB client used to connect to the MongoDB server.
 */
const client: MongoClient = new MongoClient(MONGO_URL, {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000
});

/**
 * Initializes the database connection, connecting to the MongoDB server and setting up collections.
 *
 * @returns A Promise that resolves when the initialization is complete.
 */
export const initializeDatabaseConnection = async (): Promise<void> => {
    try {
        await client.connect();
        consoleLog("DATABASE LOG: Connected to MongoDB Server", LEVEL.OK)
        databaseConnection = client.db(MONGO_DATABASE);
        collections["user-account"] = databaseConnection.collection("user-account");
        collections["farm-info"] = databaseConnection.collection("farm-info");
        collections["farm-products"] = databaseConnection.collection("farm-products");
        collections["forum"] = databaseConnection.collection("forum");
        collections["comment"] = databaseConnection.collection("comment");
        collections["news"] = databaseConnection.collection("news");
        // More to add here
    } catch (error: any) {
        consoleLog(`DATABASE ERROR: ${error.message}`, LEVEL.ERROR);
        databaseConnection = null;
    }
}

/**
 * Checks whether the database connection has been initialized.
 *
 * @returns `true` if the database connection is initialized, `false` otherwise.
 */
export const isDatabaseConnectionInitialized = (): boolean => {
    return databaseConnection !== null;
}

/**
 * Terminates the database connection, closing the connection to the MongoDB server.
 *
 * @returns A Promise that resolves when the connection is successfully closed.
 */
export const terminateDatabaseConnection = async (): Promise<void> => {
    for (let key in collections) {
        collections[key] = null;
    }
    databaseConnection = null;
    await client.close();
    consoleLog("DATABASE LOG: Connection to MongoDB Server closed", LEVEL.OK)
}

/**
 * A class for interacting with the database.
 */
export class Database {
    /**
     * Retrieves a user from the database by their email.
     *
     * @param email - The email of the user to look up.
     * @returns A Promise that resolves to the user object or null if not found.
     */
    public static async getUserByEmail(email: string): Promise<any> {
        consoleLog("DATABASE LOG: Getting user by email...", LEVEL.OK)
        return await collections["user-account"].findOne({"credentials.email": email});
    }

    /**
     * Retrieves a user from the database by their username.
     *
     * @param username - The username of the user to look up.
     * @returns A Promise that resolves to the user object or null if not found.
     */
    public static async getUserByUsername(username: string): Promise<any> {
        consoleLog("DATABASE LOG: Getting user by username...", LEVEL.OK)
        return await collections["user-account"].findOne({"credentials.username": username});
    }

    /**
     * Retrieves a user from the database by their unique ObjectID.
     *
     * @param _id - The ObjectID of the user to look up.
     * @returns A Promise that resolves to the user object or null if not found.
     */
    public static async getUserByObjectID(_id: ObjectId): Promise<any> {
        consoleLog("DATABASE LOG: Getting user by ObjectID...", LEVEL.OK)
        return await collections["user-account"].findOne({_id: _id});
    }

    /**
     * Retrieves cached user information from the database by their unique ObjectID.
     *
     * @param _id - The ObjectID of the user to retrieve cache information for.
     * @returns A Promise that resolves to a TypeUserCache object.
     */
    public static async getUserCache(_id: ObjectId): Promise<TypeUserCache> {
        consoleLog(`DATABASE LOG: Getting {` + _id + `} cache information...`, LEVEL.OK)
        const result = await collections["user-account"].findOne({_id: _id});
        return {
            full_name: result.full_name,
            email: result.credentials.email,
            username: result.credentials.username,
            profile_picture: result.profile_picture,
            user_role: result.role,
        };
    }

    /**
     * Retrieves user credentials from the database by their unique ObjectID.
     *
     * @param _id - The ObjectID of the user to retrieve credentials for.
     * @returns A Promise that resolves to a Credentials object.
     */
    public static async getUserCredentialsByObjectID(_id: ObjectId): Promise<Credentials> {
        consoleLog("DATABASE LOG: Getting user credentials by ObjectID...", LEVEL.OK)
        const result = await collections["user-account"].findOne({_id: _id});
        return result.credentials;
    }

    /**
     * Inserts a reset password token for a user by their unique ObjectID.
     *
     * @param _id - The ObjectID of the user for whom the reset token is inserted.
     * @param token - The reset password token to be inserted.
     * @returns A boolean indicating whether the reset token insertion was successful.
     */
    public static async insertResetPasswordToken(_id: ObjectId, token: string): Promise<boolean> {
        const result = await collections["user-account"].updateOne(
            {_id: _id},
            {$set: {"credentials.password_reset_token": token}}
        );
        if (result.modifiedCount === 1) {
            consoleLog("DATABASE LOG: Reset token inserted successfully", LEVEL.OK);
            return true;
        }
        consoleLog("DATABASE LOG: Reset token insertion failed", LEVEL.ERROR);
        return false;
    }

    // ##############################################################################################################
    // ##############################################################################################################
    // ##############################################################################################################
    // END OF USER ACCOUNT DATABASE OPERATIONS. START OF FARM INFO DATABASE OPERATIONS
    // ##############################################################################################################
    // ##############################################################################################################
    // ##############################################################################################################

    /**
     * Retrieves information about all farms from the database.
     *
     * @returns A Promise that resolves to an array of farm information objects.
     */
    public static async getAllFarms(): Promise<any> {
        consoleLog("DATABASE LOG: Getting all farms information...", LEVEL.OK)
        return await collections["farm-info"].find({}).toArray();
    }

    /**
     * Retrieves information about a single farm by its unique identifier (UID).
     *
     * @param farm_uid - The unique identifier (UID) of the farm to retrieve information for.
     * @returns A Promise that resolves to the farm information object or null if not found.
     */
    public static async getOneFarm(farm_uid: string): Promise<any> {
        consoleLog(`DATABASE LOG: Getting farm {` + farm_uid + `} information...`, LEVEL.OK)
        return await collections["farm-info"].findOne({"uid": farm_uid});
    }

    /**
     * Retrieves information about all farm products from the database.
     *
     * @returns A Promise that will eventually contain the data once the implementation is completed.
     */
    public static async getAllFarmProducts(): Promise<any> {
        // TODO: Implement this
    }

    /**
     * Retrieves information about farm products associated with a single farm by its unique identifier (UID).
     *
     * @param farm_uid - The unique identifier (UID) of the farm to retrieve product information for.
     * @returns A Promise that resolves to the farm products information object or null if not found.
     */
    public static async getOneFarmProducts(farm_uid: string): Promise<any> {
        consoleLog(`DATABASE LOG: Getting farm products {` + farm_uid + `} information...`, LEVEL.OK)
        return await collections["farm-products"].findOne({"uid": farm_uid});
    }

    /**
     * Retrieves information about a single product by its unique identifier (ID).
     *
     * @param product_id - The unique identifier (ID) of the product to retrieve information for.
     * @returns A Promise that resolves to the product information object or null if not found.
     */
    public static async getOneProduct(product_id: string): Promise<any> {
        consoleLog(`DATABASE LOG: Getting product {` + product_id + `} information...`, LEVEL.OK)
        const result = await collections["farm-products"].findOne({'products.id': product_id});
        const products = result.products;
        for (let i: number = 0; i < products.length; i++) {
            if (products[i].id === product_id) {
                return products[i];
            }
        }
        return null;
    }

    // ##############################################################################################################
    // ##############################################################################################################
    // ##############################################################################################################
    // END OF FARM INFO DATABASE OPERATIONS. START OF FORUM DATABASE OPERATIONS
    // ##############################################################################################################
    // ##############################################################################################################
    // ##############################################################################################################

    public static async insertPost(post: Post) {
        return await collections["forum"].insertOne(post);
    }

    public static async editPost() {
        // TODO: Implement this
    }

    public static async deletePost() {
        // TODO: Implement this
    }

    public static async getOnePost(post_uid: ObjectId) {
        consoleLog(`DATABASE LOG: Getting post {` + post_uid + `} information...`, LEVEL.OK)
        return await collections["forum"].findOne({_id: post_uid});
    }

    public static async getAllPosts() {
        consoleLog("DATABASE LOG: Getting all posts...", LEVEL.OK)
        return await collections["forum"].find({}).toArray();
    }

    public static async getMostLikedPosts() {
        consoleLog("DATABASE LOG: Getting all most liked posts...", LEVEL.OK)
        return await collections["forum"].find({}).sort({like: -1}).limit(3).toArray();
    }

    public static async insertReplyInPost(reply: any) {
        consoleLog(`DATABASE LOG: Sending reply {` + reply + `} information...`, LEVEL.OK)
        return await collections["comment"].insertOne(reply);
    }



}