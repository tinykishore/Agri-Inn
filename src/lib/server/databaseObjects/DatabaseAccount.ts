import Database from "$lib/server/database";
import consoleLog, {LEVEL} from "$lib/server/log";
import type {ObjectId} from "mongodb";

export default class DatabaseAccount extends Database {
    /**
     * Retrieves a user from the database by their email.
     *
     * @param email - The email of the user to look up.
     * @returns A Promise that resolves to the user object or null if not found.
     */
    public static async getUserByEmail(email: string): Promise<any> {
        consoleLog("DATABASE LOG: Getting user by email...", LEVEL.OK)
        return await super.collections["user-account"].findOne({"credentials.email": email});
    }

    /**
     * Retrieves a user from the database by their username.
     *
     * @param username - The username of the user to look up.
     * @returns A Promise that resolves to the user object or null if not found.
     */
    public static async getUserByUsername(username: string): Promise<any> {
        consoleLog("DATABASE LOG: Getting user by username...", LEVEL.OK)
        return await super.collections["user-account"].findOne({"credentials.username": username});
    }

    /**
     * Retrieves a user from the database by their unique ObjectID.
     *
     * @param _id - The ObjectID of the user to look up.
     * @returns A Promise that resolves to the user object or null if not found.
     */
    public static async getUserByObjectID(_id: ObjectId): Promise<any> {
        consoleLog("DATABASE LOG: Getting user by ObjectID...", LEVEL.OK)
        return await super.collections["user-account"].findOne({_id: _id});
    }

    /**
     * Retrieves cached user information from the database by their unique ObjectID.
     *
     * @param _id - The ObjectID of the user to retrieve cache information for.
     * @returns A Promise that resolves to a TypeUserCache object.
     */
    public static async getUserCache(_id: ObjectId) {
        consoleLog(`DATABASE LOG: Getting {` + _id + `} cache information...`, LEVEL.OK)
        const result = await super.collections["user-account"].findOne({_id: _id});
        return {
            _id: result._id,
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
        const result = await super.collections["user-account"].findOne({_id: _id});
        return result.credentials;
    }

    /**
     * Inserts a reset password token for a user by their unique ObjectID.
     *
     * @param email - The ObjectID of the user for whom the reset token is inserted.
     * @param token - The reset password token to be inserted.
     * @returns A boolean indicating whether the reset token insertion was successful.
     */
    public static async insertResetPasswordToken(email: string, token: string): Promise<boolean> {
        const result = await super.collections["user-account"].updateOne(
            {"credentials.email": email},
            {$set: {"credentials.password_reset_token": token}}
        );
        if (result.modifiedCount === 1) {
            consoleLog("DATABASE LOG: Reset token inserted successfully", LEVEL.OK);
            return true;
        }
        consoleLog("DATABASE LOG: Reset token insertion failed", LEVEL.ERROR);
        return false;
    }

    public static async getResetPasswordToken(token: string) {
        consoleLog("DATABASE LOG: Getting reset password token...", LEVEL.OK)
        const result = await super.collections["user-account"].findOne({"credentials.password_reset_token": token});
        if (result !== null) {
            consoleLog("DATABASE LOG: Reset token found", LEVEL.OK);
            return {
                _id: result._id,
                success: true
            }
        }
        consoleLog("DATABASE LOG: Reset token not found", LEVEL.ERROR);
        return {success: false}
    }

    public static async deleteResetPasswordToken(_id: ObjectId) {
        consoleLog("DATABASE LOG: Deleting reset password token...", LEVEL.OK)
        const result = await super.collections["user-account"].updateOne(
            {_id: _id},
            {$unset: {"credentials.password_reset_token": ""}}
        );
        if (result.modifiedCount === 1) {
            consoleLog("DATABASE LOG: Reset token deleted successfully", LEVEL.OK);
            return true;
        }

        consoleLog("DATABASE LOG: Reset token deletion failed", LEVEL.ERROR);
        return false;

    }

    public static async updatePassword(_id: ObjectId, password: string) {
        consoleLog("DATABASE LOG: Updating password...", LEVEL.OK)
        const result = await super.collections["user-account"].updateOne(
            {_id: _id},
            {$set: {"credentials.password_hash": password}}
        );
        if (result.modifiedCount === 1) {
            consoleLog("DATABASE LOG: Password updated successfully", LEVEL.OK);
            return true;
        }
        consoleLog("DATABASE LOG: Password update failed", LEVEL.ERROR);
        return false;
    }

    public static async updateGoogleID(email: string, google_id: string) {
        consoleLog("DATABASE LOG: Updating Google ID...", LEVEL.OK)
        const result = await super.collections["user-account"].updateOne(
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

    public static async insertUser(userObject: UserObject): Promise<any> {
        consoleLog("DATABASE LOG: Inserting user...", LEVEL.OK)
        return await super.collections["user-account"].insertOne(userObject);
    }

    public static async completeGoogleSignUp(_id: ObjectId, username: string, password_hash: string) {
        // insert username and password_hash into database for user with _id
        consoleLog("DATABASE LOG: Completing Google Sign Up...", LEVEL.OK)
        const result = await super.collections["user-account"].updateOne(
            {_id: _id},
            {$set: {"credentials.username": username, "credentials.password_hash": password_hash}}
        );
        if (result.modifiedCount === 1) {
            consoleLog("DATABASE LOG: Google Sign Up completed successfully", LEVEL.OK);
            return true;
        }
        consoleLog("DATABASE LOG: Google Sign Up failed", LEVEL.ERROR);
        return false;
    }

    public static async updateProfilePicture(_id: ObjectId, profile_picture: string) {
        consoleLog("DATABASE LOG: Updating profile picture...", LEVEL.OK)
        const result = await super.collections["user-account"].updateOne(
            {_id: _id},
            {$set: {"profile_picture": profile_picture}}
        );
        if (result.modifiedCount === 1) {
            consoleLog("DATABASE LOG: Profile picture updated successfully", LEVEL.OK);
            return true;
        }
        consoleLog("DATABASE LOG: Profile picture update failed", LEVEL.ERROR);
        return false;
    }

    public static async crosscheckUsernameAndObjectID(username: string, _id: ObjectId) {
        consoleLog("DATABASE LOG: Crosschecking username and ObjectID...", LEVEL.OK)
        const result = await super.collections["user-account"].findOne({"credentials.username": username});
        if (result !== null) {
            if (result._id.equals(_id)) {
                consoleLog("DATABASE LOG: Username and ObjectID match", LEVEL.OK);
                return true;
            }
        }
        consoleLog("DATABASE LOG: Username and ObjectID do not match", LEVEL.ERROR);
        return false;
    }
}