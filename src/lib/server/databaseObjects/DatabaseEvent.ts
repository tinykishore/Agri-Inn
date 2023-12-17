import Database from "$lib/server/Database";
import consoleLog, {LEVEL} from "$lib/server/log";
import type {ObjectId} from "mongodb";

export class DatabaseEvent extends Database {

    public static async getAllEvents(): Promise<any> {
        consoleLog(`DATABASE LOG: Getting all events information...`, LEVEL.OK)
        return await super.collections["event"].find({}).toArray();
    }

    public static async getOneEvent(_id: ObjectId) {
        consoleLog(`DATABASE LOG: Getting event {` + _id + `} information...`, LEVEL.OK)
        return await super.collections["event"].findOne({_id: _id});
    }

    public static async updateOneEvent(_id: ObjectId, farm_id: any) {
        consoleLog(`DATABASE LOG: Updating event {` + _id + `} information...`, LEVEL.OK)
        return await super.collections.updateOne(
            { "_id": _id },
            { $push: { "registered_farms": farm_id } }
        );
    }

    public static async getLatestEvent() {
        consoleLog(`DATABASE LOG: Getting latest event information...`, LEVEL.OK)
        return await super.collections["event"].find({}).sort({event_date: -1}).limit(1).toArray();

    }
}