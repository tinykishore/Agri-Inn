import {Database} from "$lib/server/database";
import {ObjectId} from "mongodb";
import {error} from "@sveltejs/kit";

export let load = async ({params}: any) => {
    // Fetch the user's object ID from the URL
    const userObjectID: any = params._id;
    // Convert it to an ObjectId
    const _id: ObjectId = new ObjectId(userObjectID);
    // search for this user in the database
    const result = await Database.getUserByObjectID(userObjectID);
    if (!result) {
        throw error(401, "Unauthorized");
    } else {
        // Check if the user.credentials.password_hash and user.credentials.username is ""
        if (result.credentials.password_hash === "" || result.credentials.username === "") {
            return {
                full_name: result.full_name,
                email: result.credentials.email,
                profile_picture: result.profile_picture,
                _id: userObjectID,
            }
        } else {
            throw error(401, "Unauthorized");
        }
    }
}