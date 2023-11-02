// THIS IS THE UPDATED VERSION OF database.ts
// version 3.0.0
// author: @tinykishore
import {Db, MongoClient} from "mongodb";
import {MONGO_DATABASE, MONGO_URL} from "$env/static/private";
import consoleLog, {LEVEL} from "$lib/server/log";

/**
 * The database connection object used to interact with the MongoDB database.
 * Initialized as `null` by default.
 */
let databaseConnection: Db | null = null;

/**
 * An object that stores various collections used for database operations.
 */
let collections: any = {}

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

        // Dynamically fetch all collections in the database
        consoleLog("DATABASE LOG: Fetching collections...", LEVEL.INFO)
        const collectionsList = await databaseConnection.listCollections().toArray();

        // Create collections dynamically
        consoleLog("DATABASE LOG: Creating collections...", LEVEL.INFO)
        for (const collectionInfo of collectionsList) {
            collections[collectionInfo.name] = databaseConnection.collection(collectionInfo.name);
            // consoleLog(`DATABASE LOG: Created collection {` + collectionInfo.name + `}`, LEVEL.INFO)
        }
        consoleLog("DATABASE LOG: Collections created successfully", LEVEL.OK)
        console.log(collections)
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
export default class Database {

    // Declare private static variables
    protected static collections = collections;



    public static async getHealthTrack() {
        consoleLog("DATABASE LOG: Getting all health track information...", LEVEL.OK)
        return await collections["animal-health-details"].find({}).toArray();
    }

}