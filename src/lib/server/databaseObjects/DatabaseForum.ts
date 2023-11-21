import Database from "$lib/server/database";
import consoleLog, {LEVEL} from "$lib/server/log";
import type {ObjectId} from "mongodb";

export default class DatabaseForum extends Database {
    /**
     * Retrieves information about a single post from the forum by its unique ObjectID.
     *
     * @param post_uid - The ObjectID of the post to retrieve information for.
     * @returns A Promise that resolves to the post information object or null if not found.
     */
    public static async getOnePost(post_uid: ObjectId): Promise<any> {
        consoleLog(`DATABASE LOG: Getting post {` + post_uid + `} information...`, LEVEL.OK)
        return await super.collections["forum"].findOne({_id: post_uid});
    }

    /**
     * Retrieves information about all posts from the forum.
     *
     * @returns A Promise that resolves to an array of post information objects.
     */
    public static async getAllPosts(): Promise<any> {
        consoleLog("DATABASE LOG: Getting all posts...", LEVEL.OK)
        return await super.collections["forum"].find({}).toArray();
    }

    /**
     * Retrieves information about the most liked posts from the forum.
     *
     * @returns A Promise that resolves to an array of the most liked post information objects.
     */
    public static async getMostLikedPosts(): Promise<any> {
        consoleLog("DATABASE LOG: Getting all most liked posts...", LEVEL.OK)
        return await super.collections["forum"].find({}).sort({like: -1}).limit(3).toArray();
    }

    /**
     * Inserts a reply into a post in the comment section.
     *
     * @param reply - The reply to be inserted.
     * @returns A Promise that resolves to the result of the insertion operation.
     */
    public static async insertReplyInPost(reply: any): Promise<any> {
        consoleLog(`DATABASE LOG: Sending reply {` + reply + `} information...`, LEVEL.OK)
        return await super.collections["comment"].insertOne(reply);
    }

    public static async votePost(postObjectID: ObjectId, likerObjectID: string, alreadyLiked: boolean): Promise<any> {
        consoleLog(`DATABASE LOG: Voting post {` + postObjectID + `} by user {` + likerObjectID + `}...`, LEVEL.OK)
        if (!alreadyLiked) {
            consoleLog(`DATABASE LOG: User {` + likerObjectID + `} already liked post {` + postObjectID + `}. Removing like...`, LEVEL.WARN)
            return await super.collections["forum"].updateOne(
                {_id: postObjectID},
                {$pull: {likes: likerObjectID}}
            );
        } else {
            consoleLog(`DATABASE LOG: User {` + likerObjectID + `} has not liked post {` + postObjectID + `}. Adding like...`, LEVEL.WARN)
            return await super.collections["forum"].updateOne(
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
        return await super.collections["forum"].updateOne(
            {_id: _id},
            {$inc: {viewCount: 1}}
        );
    }

    /**
     * Inserts a new post into the forum.
     *
     * @param post - The post to be inserted.
     * @returns A Promise that resolves to the result of the insertion operation.
     */
    public static async insertPost(post: Post): Promise<any> {
        consoleLog(`DATABASE LOG: Inserting post {` + post + `} information...`, LEVEL.OK)
        return await super.collections["forum"].insertOne(post);
    }

     public static async getAllVets() {
         consoleLog("DATABASE LOG: Getting all vets...", LEVEL.OK)
         return await super.collections["vets"].find({}).toArray();

    }
}