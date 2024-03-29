import Database from "$lib/server/Database";
import consoleLog, {LEVEL} from "$lib/server/log";
import type {ObjectId} from "mongodb";


export default class DatabaseNews extends Database {
    public static async getAllNews() {
        consoleLog("DATABASE LOG: Getting all news information...", LEVEL.OK)
        return await super.collections["news"].find({}).toArray();
    }

    public static async getOneNews(news_uid?: string | null, _id?:ObjectId | null): Promise<any> {
        consoleLog(`DATABASE LOG: Getting farm {` + news_uid + `} information...`, LEVEL.OK)
        return await this.collections["news"].findOne(
            {
                $or: [
                    {_id: _id},
                    {news_uid: news_uid}
                ]
            }
        );
    }

    public static async saveNews(user_id: string, news_id: string,) {
        consoleLog(`DATABASE LOG: Saving news {` + news_id + `}`, LEVEL.OK)

        const x = await super.collections["saved_items"].updateOne(
            {user_id: user_id},
            {$addToSet: {saved_news: news_id}}
        );

        console.log(x)
        return x;

    }

}