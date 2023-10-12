import {Db, MongoClient} from "mongodb";
import {MONGO_DATABASE, MONGO_URL, USER_ACCOUNTS_COLLECTION} from "$env/static/private";
import consoleLog, {LEVEL} from "$lib/server/log";

export const Collections = {
    user_account: USER_ACCOUNTS_COLLECTION,
    farm_info: null
}

const client: MongoClient = new MongoClient(MONGO_URL, {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000
});

const connectToMongo = async (): Promise<Db> => {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        consoleLog("DATABASE LOG: Connected to MongoDB Server", LEVEL.OK)
        // Return the database object
        return client.db(MONGO_DATABASE);
    } catch (error: any) {
        consoleLog(`DATABASE ERROR: ${error.message}`, LEVEL.ERROR);
        throw new Error('Internal Server Error');
    }
};

const closeMongoConnection = async (): Promise<void> => {
    // Close the client
    consoleLog("DATABASE LOG: Connection to MongoDB Server closed", LEVEL.OK)
    await client.close();
};

export async function getUserByEmail(email: string) {
    // Connect to the MongoDB cluster
    const database = await connectToMongo();
    // Get the collection
    const collection = database.collection('user-account');
    // Insert the document into the database, return the result and close the connection
    const result = await collection.findOne({"credentials.email": email});
    consoleLog("DATABASE LOG: Getting user by email...", LEVEL.OK)
    await closeMongoConnection();
    return result;
}

export async function getUserByUsername(username: string) {
    // Connect to the MongoDB cluster
    const database = await connectToMongo();
    // Get the collection
    const collection = database.collection('user-account');
    // Insert the document into the database, return the result and close the connection
    const result = await collection.findOne({"credentials.username": username});
    consoleLog("DATABASE LOG: Getting user by username...", LEVEL.OK)
    await closeMongoConnection();
    return result;
}

export async function getAllFarmInfo() {
    // Connect to the MongoDB cluster
    const database = await connectToMongo();

    // Get the collection
    const collection = database.collection('farm-info');

    // Insert the document into the database, return the result and close the connection
    consoleLog("DATABASE LOG: Getting all farms information...", LEVEL.OK)
    const result = await collection.find({}).toArray();
    await closeMongoConnection();
    return result;
}