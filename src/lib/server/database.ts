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
    consoleLog("DATABASE LOG: Initializing database connection...", LEVEL.INFO);
    const t_0: number = performance.now();
    try {
        await client.connect();
        databaseConnection = client.db(MONGO_DATABASE);
        collections["user-account"] = databaseConnection.collection("user-account");
        collections["farm-info"] = databaseConnection.collection("farm-info");
        collections["farm-products"] = databaseConnection.collection("farm-products");
        collections["forum"] = databaseConnection.collection("forum");
        collections["comment"] = databaseConnection.collection("comment");
        collections["news"] = databaseConnection.collection("news");
        // More to add here

        const t_1: number = performance.now();
        consoleLog(`DATABASE LOG: Connected to MongoDB Server (took ${Math.round(t_1 - t_0)} ms)`, LEVEL.OK);
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
    if (databaseConnection === null) {
        consoleLog("DATABASE LOG: Database connection not initialized", LEVEL.WARN);
        return false;
    }
    consoleLog("DATABASE LOG: Database connection initialized", LEVEL.INFO);
    return true;
}

/**
 * Terminates the database connection, closing the connection to the MongoDB server.
 *
 * @returns A Promise that resolves when the connection is successfully closed.
 */
export const terminateDatabaseConnection = async (): Promise<void> => {
    consoleLog("DATABASE LOG: Terminating database connection...", LEVEL.INFO);
    const t_0: number = performance.now();
    for (let key in collections) {
        collections[key] = null;
    }
    databaseConnection = null;
    await client.close();
    const t_1: number = performance.now();
    consoleLog("DATABASE LOG: Connection to MongoDB Server closed (took " + Math.round(t_1 - t_0) + " ms)", LEVEL.OK);
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
        consoleLog("DATABASE LOG: Getting user by email...", LEVEL.INFO);
        const t_0: number = performance.now();
        const response = await collections["user-account"].findOne({"credentials.email": email});
        if (response) {
            const t_1: number = performance.now();
            consoleLog(`DATABASE LOG: User found by email: ${email} (took ${Math.round(t_1 - t_0)} ms)`, LEVEL.OK);
            return response;
        }
        consoleLog(`DATABASE LOG: User not found by email: ${email}`, LEVEL.ERROR);
        return Promise.reject("User not found");
    }

    /**
     * Retrieves a user from the database by their username.
     *
     * @param username - The username of the user to look up.
     * @returns A Promise that resolves to the user object or null if not found.
     */
    public static async getUserByUsername(username: string): Promise<any> {
        consoleLog("DATABASE LOG: Getting user by username...", LEVEL.INFO);
        const t_0: number = performance.now();
        const response = await collections["user-account"].findOne({"credentials.username": username});
        if (response) {
            const t_1: number = performance.now();
            consoleLog(`DATABASE LOG: User found by username: ${username} (took ${Math.round(t_1 - t_0)} ms)`, LEVEL.OK);
            return response;
        }
        consoleLog(`DATABASE LOG: User not found by username: ${username}`, LEVEL.ERROR);
        return Promise.reject("User not found");
    }

    /**
     * Retrieves a user from the database by their unique ObjectID.
     *
     * @param _id - The ObjectID of the user to look up.
     * @returns A Promise that resolves to the user object or null if not found.
     */
    public static async getUserByObjectID(_id: ObjectId): Promise<any> {
        consoleLog("DATABASE LOG: Getting user by ObjectID...", LEVEL.INFO);
        const t0: number = performance.now();
        const response = await collections["user-account"].findOne({_id: _id});
        if (response) {
            const t1: number = performance.now();
            consoleLog(`DATABASE LOG: User found by ObjectID: ${_id} (took ${Math.round(t1 - t0)} ms)`, LEVEL.OK);
            return response;
        }
        consoleLog(`DATABASE LOG: User not found by ObjectID: ${_id}`, LEVEL.ERROR);
        return Promise.reject("User not found");
    }

    /**
     * Retrieves cached user information from the database by their unique ObjectID.
     *
     * @param _id - The ObjectID of the user to retrieve cache information for.
     * @returns A Promise that resolves to a TypeUserCache object.
     */
    public static async getUserCache(_id: ObjectId): Promise<TypeUserCache> {
        consoleLog(`DATABASE LOG: Getting {` + _id + `} cache information...`, LEVEL.INFO);
        const t0: number = performance.now();
        const result = await collections["user-account"].findOne({_id: _id});
        if (result) {
            const t1: number = performance.now();
            consoleLog(`DATABASE LOG: Cache found for {` + _id + `} (took ${Math.round(t1 - t0)} ms)`, LEVEL.OK);
            return {
                full_name: result.full_name,
                email: result.credentials.email,
                username: result.credentials.username,
                profile_picture: result.profile_picture,
                user_role: result.role,
            };
        }
        consoleLog(`DATABASE LOG: Cache not found for {` + _id + `}`, LEVEL.ERROR);
        return Promise.reject("Cache not found");
    }


    /**
     * Retrieves user credentials from the database by their unique ObjectID.
     *
     * @param _id - The ObjectID of the user to retrieve credentials for.
     * @returns A Promise that resolves to a Credentials object.
     */
    public static async getUserCredentialsByObjectID(_id: ObjectId): Promise<any> {
        consoleLog("DATABASE LOG: Getting user credentials by ObjectID...", LEVEL.INFO);
        const t0: number = performance.now();
        const response = await collections["user-account"].findOne({_id: _id});
        if (response) {
            const t1: number = performance.now();
            consoleLog(`DATABASE LOG: User credentials found by ObjectID: ${_id} (took ${Math.round(t1 - t0)} ms)`, LEVEL.OK);
            return response.credentials;
        }
        consoleLog(`DATABASE LOG: User credentials not found by ObjectID: ${_id}`, LEVEL.ERROR);
        return Promise.reject("User credentials not found");
    }

    /**
     * Inserts a reset password token for a user by their unique ObjectID.
     *
     * @param email - The email of the user for whom the reset token is inserted.
     * @param token - The reset password token to be inserted.
     * @returns A boolean indicating whether the reset token insertion was successful.
     */
    public static async insertResetPasswordToken(email: string, token: string): Promise<boolean> {
        consoleLog(`DATABASE LOG: Inserting reset password token for {` + email + `}...`, LEVEL.INFO);
        const t0: number = performance.now();
        const result = await collections["user-account"].updateOne(
            {"credentials.email": email},
            {$set: {"credentials.password_reset_token": token}}
        );
        if (result.modifiedCount === 1) {
            const t1: number = performance.now();
            consoleLog(`DATABASE LOG: Reset token inserted successfully for {` + email + `} (took ${Math.round(t1 - t0)} ms)`, LEVEL.OK);
            return true;
        }
        consoleLog(`DATABASE LOG: Reset token insertion failed for {` + email + `}`, LEVEL.ERROR);
        return false;
    }

    /**
     * Get a reset password token from the database.
     *
     * @param {string} token - The reset password token to search for.
     * @returns {Promise<{ _id?: string, success: boolean }>} A Promise that resolves with an object containing the user's ID (if found) and a success flag.
     * @throws {Error} Throws an error if there's an issue with the database operation.
     */
    public static async getResetPasswordToken(token: string): Promise<{ _id?: string; success: boolean; }> {
        consoleLog("DATABASE LOG: Getting reset password token...", LEVEL.INFO);
        const t0: number = performance.now();
        const result = await collections["user-account"].findOne({"credentials.password_reset_token": token});
        if (result !== null) {
            const t1: number = performance.now();
            consoleLog(`DATABASE LOG: Reset token found for {` + result.credentials.username + `} (took ${Math.round(t1 - t0)} ms)`, LEVEL.OK);
            return {
                _id: result._id,
                success: true
            }
        }
        consoleLog(`DATABASE LOG: Reset token not found`, LEVEL.ERROR);
        return {success: false}
    }

    /**
     * Delete a reset password token from the database for a specific user.
     *
     * @param {ObjectId} _id - The unique identifier of the user to remove the reset password token from.
     * @returns {Promise<boolean>} A Promise that resolves with a boolean value indicating the success of the deletion.
     * @throws {Error} Throws an error if there's an issue with the database operation.
     */
    public static async deleteResetPasswordToken(_id: ObjectId): Promise<boolean> {
        consoleLog("DATABASE LOG: Deleting reset password token...", LEVEL.OK);
        const t0: number = performance.now();
        const result = await collections["user-account"].updateOne(
            {_id: _id},
            {$unset: {"credentials.password_reset_token": ""}}
        );
        if (result.modifiedCount === 1) {
            const t1: number = performance.now();
            consoleLog("DATABASE LOG: Reset token deleted successfully (took " + Math.round(t1 - t0) + " ms)", LEVEL.OK);
            return true;
        }
        consoleLog("DATABASE LOG: Reset token deletion failed", LEVEL.ERROR);
        return false;
    }

    /**
     * Update the password for a specific user in the database.
     *
     * @param {ObjectId} _id - The unique identifier of the user to update the password for.
     * @param {string} password - The new password to set for the user.
     * @returns {Promise<boolean>} A Promise that resolves with a boolean value indicating the success of the password update.
     * @throws {Error} Throws an error if there's an issue with the database operation.
     */
    public static async updatePassword(_id: ObjectId, password: string): Promise<boolean> {
        consoleLog("DATABASE LOG: Updating password...", LEVEL.OK);
        const t0: number = performance.now();
        const result = await collections["user-account"].updateOne(
            {_id: _id},
            {$set: {"credentials.password_hash": password}}
        );
        if (result.modifiedCount === 1) {
            const t1: number = performance.now();
            consoleLog("DATABASE LOG: Password updated successfully (took " + Math.round(t1 - t0) + " ms)", LEVEL.OK);
            return true;
        }
        consoleLog("DATABASE LOG: Password update failed", LEVEL.ERROR);
        return false;
    }

    /**
     * Update the Google ID for a user in the database based on their email.
     *
     * @param {string} email - The email of the user for whom to update the Google ID.
     * @param {string} google_id - The new Google ID to set for the user.
     * @returns {Promise<boolean>} A Promise that resolves with a boolean value indicating the success of the Google ID update.
     * @throws {Error} Throws an error if there's an issue with the database operation.
     */
    public static async updateGoogleID(email: string, google_id: string): Promise<boolean> {
        consoleLog("DATABASE LOG: Updating Google ID...", LEVEL.OK);
        const t0: number = performance.now();
        const result = await collections["user-account"].updateOne(
            {"credentials.email": email},
            {$set: {"credentials.google_id": google_id}}
        );
        if (result.modifiedCount === 1) {
            const t1: number = performance.now();
            consoleLog("DATABASE LOG: Google ID updated successfully (took " + Math.round(t1 - t0) + " ms)", LEVEL.OK);
            return true;
        }
        consoleLog("DATABASE LOG: Google ID update failed", LEVEL.ERROR);
        return false;
    }

    /**
     * Insert a new user into the database.
     *
     * @param {UserObject} userObject - The user object to insert into the database.
     * @returns {Promise<any>} A Promise that resolves with the result of the insertion operation.
     * @throws {Error} Throws an error if there's an issue with the database operation.
     */
    public static async insertUser(userObject: UserObject): Promise<any> {
        consoleLog("DATABASE LOG: Inserting user...", LEVEL.OK)
        const t0: number = performance.now();
        const response = await collections["user-account"].insertOne(userObject);
        if (response.insertedCount === 1) {
            const t1: number = performance.now();
            consoleLog("DATABASE LOG: User inserted successfully (took " + Math.round(t1 - t0) + " ms)", LEVEL.OK);
            return response;
        }
        consoleLog("DATABASE LOG: User insertion failed", LEVEL.ERROR);
        return Promise.reject("User insertion failed");
    }

    /**
     * Complete a Google Sign Up process for a user in the database.
     *
     * @param {ObjectId} _id - The unique identifier of the user who is completing the Google Sign Up.
     * @param {string} username - The username to set for the user.
     * @param {string} password_hash - The password hash to set for the user.
     * @returns {Promise<boolean>} A Promise that resolves with a boolean value indicating the success of the Google Sign Up completion.
     * @throws {Error} Throws an error if there's an issue with the database operation.
     */
    public static async completeGoogleSignUp(_id: ObjectId, username: string, password_hash: string): Promise<boolean> {
        consoleLog("DATABASE LOG: Completing Google Sign Up...", LEVEL.OK)
        const t0: number = performance.now();
        const result = await collections["user-account"].updateOne(
            {_id: _id},
            {$set: {"credentials.username": username, "credentials.password_hash": password_hash}}
        );
        if (result.modifiedCount === 1) {
            const t1: number = performance.now();
            consoleLog("DATABASE LOG: Google Sign Up completed successfully (took " + Math.round(t1 - t0) + " ms)", LEVEL.OK);
            return true;
        }
        consoleLog("DATABASE LOG: Google Sign Up failed", LEVEL.ERROR);
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
    public static async insertReplyInPost(reply: Comment): Promise<any> {
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