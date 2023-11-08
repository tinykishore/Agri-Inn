import Database from "$lib/server/database";
import consoleLog, {LEVEL} from "$lib/server/log";


export default class DatabaseNews extends Database {
    public static async getAllNews() {
        consoleLog("DATABASE LOG: Getting all news information...", LEVEL.OK)
        return await super.collections["news"].find({}).toArray();
    }

    public static async getOneNews(news_uid: string): Promise<any> {
        consoleLog(`DATABASE LOG: Getting farm {` + news_uid + `} information...`, LEVEL.OK)
        const allNews = await this.collections["news"].findOne({"u_id": news_uid});
        console.log("kdkdkdkdkdk" + allNews)
        return allNews;
    }

    public static async saveNews(news_id: string, user_id: string): Promise<any> {
        consoleLog(`DATABASE LOG: Saving news {` + news_id + `} information...`, LEVEL.OK)

        const x=  await super.collections["book-marked-item"].updateOne(
            {user_id: user_id},
            {$addToSet: {news: news_id}}
        );
        console.log(x);
        return x;

    }

}