// THIS IS THE UPDATED VERSION OF database.ts
// version 3.0.0
// author: @tinykishore
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

    /**
     * Updates the Google ID for a user based on their email.
     *
     * @param email - The email of the user for which the Google ID should be updated.
     * @param google_id - The new Google ID to set for the user.
     * @returns A boolean indicating whether the Google ID update was successful.
     */
    public static async updateGoogleID(email: string, google_id: string): Promise<boolean> {
        const result = await collections["user-account"].updateOne(
            {"credentials.email": email},
            {$set: {"credentials.google_id": google_id}}
        );
        if (result.modifiedCount === 1) {
            consoleLog("DATABASE LOG: Google ID updated successfully", LEVEL.OK);
            return true;
        }
        consoleLog("DATABASE LOG: Google ID update failed", LEVEL.ERROR);
        return false;
    }

    public static async insertUser(newUser: UserObject): Promise<any> {
        consoleLog("DATABASE LOG: Inserting user...", LEVEL.OK)
        return await collections["user-account"].insertOne(newUser);
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

    /**
     * Inserts a new post into the forum.
     *
     * @param post - The post to be inserted.
     * @returns A Promise that resolves to the result of the insertion operation.
     */
    public static async insertPost(post: Post): Promise<any> {
        consoleLog(`DATABASE LOG: Inserting post {` + post + `} information...`, LEVEL.OK)
        return await collections["forum"].insertOne(post);
    }

    /**
     * Edits an existing post in the forum.
     *
     * @returns A Promise that will eventually contain the result of the edit operation once the implementation is completed.
     */
    public static async editPost(): Promise<any> {
        // TODO: Implement this
    }

    /**
     * Deletes an existing post from the forum.
     *
     * @returns A Promise that will eventually contain the result of the delete operation once the implementation is completed.
     */
    public static async deletePost(): Promise<any> {
        // TODO: Implement this
    }

    /**
     * Retrieves information about a single post from the forum by its unique ObjectID.
     *
     * @param post_uid - The ObjectID of the post to retrieve information for.
     * @returns A Promise that resolves to the post information object or null if not found.
     */
    public static async getOnePost(post_uid: ObjectId): Promise<any> {
        consoleLog(`DATABASE LOG: Getting post {` + post_uid + `} information...`, LEVEL.OK)
        return await collections["forum"].findOne({_id: post_uid});
    }

    /**
     * Retrieves information about all posts from the forum.
     *
     * @returns A Promise that resolves to an array of post information objects.
     */
    public static async getAllPosts(): Promise<any> {
        consoleLog("DATABASE LOG: Getting all posts...", LEVEL.OK)
        return await collections["forum"].find({}).toArray();
    }

    /**
     * Retrieves information about the most liked posts from the forum.
     *
     * @returns A Promise that resolves to an array of the most liked post information objects.
     */
    public static async getMostLikedPosts(): Promise<any> {
        consoleLog("DATABASE LOG: Getting all most liked posts...", LEVEL.OK)
        return await collections["forum"].find({}).sort({like: -1}).limit(3).toArray();
    }

    /**
     * Inserts a reply into a post in the comment section.
     *
     * @param reply - The reply to be inserted.
     * @returns A Promise that resolves to the result of the insertion operation.
     */
    public static async insertReplyInPost(reply: any): Promise<any> {
        consoleLog(`DATABASE LOG: Sending reply {` + reply + `} information...`, LEVEL.OK)
        return await collections["comment"].insertOne(reply);
    }

    public static async votePost(postObjectID: ObjectId, likerObjectID: string, alreadyLiked: boolean): Promise<any> {
        consoleLog(`DATABASE LOG: Voting post {` + postObjectID + `} by user {` + likerObjectID + `}...`, LEVEL.OK)
        if (!alreadyLiked) {
            consoleLog(`DATABASE LOG: User {` + likerObjectID + `} already liked post {` + postObjectID + `}. Removing like...`, LEVEL.WARN)
            return await collections["forum"].updateOne(
                {_id: postObjectID},
                {$pull: {likes: likerObjectID}}
            );
        } else {
            consoleLog(`DATABASE LOG: User {` + likerObjectID + `} has not liked post {` + postObjectID + `}. Adding like...`, LEVEL.WARN)
            return await collections["forum"].updateOne(
                {_id: postObjectID},
                {$addToSet: {likes: likerObjectID}}
            );
        }
    }

    public static async downVotePost(): Promise<any> {
        // TODO: Implement this
    }

    /**
     * Increments the view count for a post in the forum.
     *
     * @param _id - The ObjectID of the post for which the view count should be incremented.
     * @returns A Promise that resolves to the result of the view count increment operation.
     */
    public static async incrementViewCount(_id: ObjectId): Promise<any> {
        consoleLog("DATABASE LOG: Incrementing view count...", LEVEL.OK)
        return await collections["forum"].updateOne(
            {_id: _id},
            {$inc: {viewCount: 1}}
        );
    }

    // ##############################################################################################################
    // ##############################################################################################################
    // ##############################################################################################################
    // END OF FORUM DATABASE OPERATIONS. START OF NEWS DATABASE OPERATIONS
    // ##############################################################################################################
    // ##############################################################################################################
    // ##############################################################################################################

    public static async getAllNews() {
        consoleLog("DATABASE LOG: Getting all news information...", LEVEL.OK)
        return await collections["news"].find({}).toArray();
    }


}