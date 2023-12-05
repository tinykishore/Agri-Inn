import Database from "$lib/server/database";
import consoleLog, {LEVEL} from "$lib/server/log";
import type {ObjectId} from "mongodb";

export default class DatabaseAccount extends Database {
    /**
     * Retrieves a user account from the database based on specified criteria.
     *
     * @param _id - The unique identifier of the user account (optional).
     * @param username - The username of the user account (optional).
     * @param email - The email address associated with the user account (optional).
     *
     * @returns A Promise that resolves to the user account if found, or null if not found.
     *
     * @remarks
     * This method uses the specified criteria to search for a user account in the "user-account" collection of the database.
     * If the user account is found, it is logged with a <200> status; otherwise, a <404> status is logged.
     *
     */
    public static async getUserAccount(
        _id?: ObjectId | null,
        username?: string | null,
        email?: string | null
    ): Promise<any> {
        consoleLog("DATABASE LOG: Retrieving User...", LEVEL.INFO)
        const queryResult = await super.collections["user-account"].findOne(
            {
                $or: [
                    {"credentials.username": username},
                    {"_id": _id},
                    {"credentials.email": email}
                ]
            });

        if (queryResult !== null) consoleLog(`DATABASE LOG: <200> Retrieved User ${queryResult.credentials.username}`, LEVEL.OK);
        else consoleLog(`DATABASE LOG: <404> Retrieve Failure`, LEVEL.ERROR);
        return queryResult;
    }

    /**
     * Retrieves cached user information from the database by their unique ObjectID.
     *
     * @param _id - The ObjectID of the user to retrieve cache information for.
     * @returns A Promise that resolves to a TypeUserCache object.
     */
    public static async getUserCache(
        _id: ObjectId
    ): Promise<TypeUserCache | undefined> {
        consoleLog(`DATABASE LOG: Retrieving User Cache for {` + _id + `}`, LEVEL.INFO);
        const result = await super.collections["user-account"].findOne({_id: _id});
        if (result !== null) {
            consoleLog(`DATABASE LOG: <200> Retrieved User Cache for {` + _id + `}`, LEVEL.OK);
            return {
                _id: result._id, full_name: result.full_name, email: result.credentials.email,
                username: result.credentials.username, profile_picture: result.profile_picture,
                user_role: result.role,
            };
        }
        consoleLog(`DATABASE LOG: Retrieve Failure (404:: ${_id} not found) by ObjectID`, LEVEL.ERROR);
    }

    /**
     * Retrieves user credentials from the database by their unique ObjectID.
     *
     * @param _id - The ObjectID of the user to retrieve credentials for.
     * @returns A Promise that resolves to a Credentials object.
     */
    public static async getUserCredentialsByObjectID(_id: ObjectId): Promise<any> {
        consoleLog("DATABASE LOG: Retrieving User Credentials by ObjectID...", LEVEL.INFO)
        const result = await super.collections["user-account"].findOne({_id: _id});
        if (result !== null) {
            consoleLog(`DATABASE LOG: Retrieved User Credentials by ObjectID ${_id}`, LEVEL.OK);
            return result.credentials;
        }
        consoleLog(`DATABASE LOG: Retrieve Failure (404:: ${_id} not found) by ObjectID`, LEVEL.ERROR);
    }

    /**
     * Inserts a reset password token for a user by their unique ObjectID.
     *
     * @param email - The ObjectID of the user for whom the reset token is inserted.
     * @param token - The reset password token to be inserted.
     * @returns A boolean indicating whether the reset token insertion was successful.
     */
    public static async insertResetPasswordToken(email: string, token: string): Promise<boolean> {
        consoleLog(`DATABASE LOG: Inserting reset password token for {` + email + `}`, LEVEL.INFO);
        const result = await super.collections["user-account"].updateOne(
            {"credentials.email": email},
            {$set: {"credentials.password_reset_token": token}}
        );
        if (result.modifiedCount === 1) {
            consoleLog(`DATABASE LOG: Reset token inserted successfully for {` + email + `}`, LEVEL.OK);
            return true;
        }
        consoleLog(`DATABASE LOG: Reset token insertion failed for {` + email + `}`, LEVEL.ERROR);
        return false;
    }

    public static async getResetPasswordToken(token: string) {
        consoleLog(`DATABASE LOG: Retrieving reset password token | token: ${token}`, LEVEL.INFO);
        const result = await super.collections["user-account"].findOne({"credentials.password_reset_token": token});
        if (result !== null) {
            consoleLog(`DATABASE LOG: Reset token found`, LEVEL.OK);
            return {
                _id: result._id,
                success: true
            }
        }
        consoleLog(`DATABASE LOG: Reset token not found`, LEVEL.ERROR);
        return {success: false}
    }

    public static async deleteResetPasswordToken(_id: ObjectId) {
        consoleLog("DATABASE LOG: Deleting reset token | _id: " + _id, LEVEL.INFO);
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
        consoleLog(`DATABASE LOG: Updating password for _id: ${_id}`, LEVEL.INFO);
        const result = await super.collections["user-account"].updateOne(
            {_id: _id},
            {$set: {"credentials.password_hash": password}}
        );
        if (result.modifiedCount === 1) {
            consoleLog(`DATABASE LOG: Password updated successfully for _id: ${_id}`, LEVEL.OK);
            return true;
        }
        consoleLog(`DATABASE LOG: Password update failed for _id: ${_id}`, LEVEL.ERROR);
        return false;
    }

    public static async updateGoogleID(email: string, google_id: string) {
        consoleLog(`DATABASE LOG: Updating Google ID for email: ${email}`, LEVEL.INFO);
        const result = await super.collections["user-account"].updateOne(
            {"credentials.email": email},
            {$set: {"credentials.google_id": google_id}}
        );
        if (result.modifiedCount === 1) {
            consoleLog(`DATABASE LOG: Google ID updated successfully for email: ${email}`, LEVEL.OK);
            return true;
        }
        consoleLog(`DATABASE LOG: Google ID update failed for email: ${email}`, LEVEL.ERROR);
        return false;
    }

    public static async insertUser(userObject: UserObject): Promise<any> {
        consoleLog(`DATABASE LOG: Inserting user | email: ${userObject.credentials.email}`, LEVEL.INFO);
        const result =  super.collections["user-account"].insertOne(userObject);
        if (result !== null) {
            consoleLog(`DATABASE LOG: User inserted successfully | email: ${userObject.credentials.email}`, LEVEL.OK);
            return result;
        }
        consoleLog(`DATABASE LOG: User insertion failed | email: ${userObject.credentials.email}`, LEVEL.ERROR);
    }

    public static async completeGoogleSignUp(_id: ObjectId, username: string, password_hash: string) {
        // insert username and password_hash into database for user with _id
        consoleLog(`DATABASE LOG: Completing Google Sign Up | _id: ${_id} && username: ${username}`, LEVEL.INFO);
        const result = await super.collections["user-account"].updateOne(
            {_id: _id},
            {$set: {"credentials.username": username, "credentials.password_hash": password_hash}}
        );
        if (result.modifiedCount === 1) {
            consoleLog(`DATABASE LOG: Google Sign Up completed successfully | _id: ${_id} && username: ${username}`, LEVEL.OK);
            return true;
        }
        consoleLog(`DATABASE LOG: Google Sign Up completion failed | _id: ${_id} && username: ${username}`, LEVEL.ERROR);
        return false;
    }

    public static async updateProfilePicture(_id: ObjectId, profile_picture: string) {
        consoleLog(`DATABASE LOG: Updating profile picture | _id: ${_id}`, LEVEL.INFO);
        const result = await super.collections["user-account"].updateOne(
            {_id: _id},
            {$set: {"profile_picture": profile_picture}}
        );
        if (result.modifiedCount === 1) {
            consoleLog(`DATABASE LOG: Profile picture updated successfully | _id: ${_id}`, LEVEL.OK);
            return true;
        }
        consoleLog(`DATABASE LOG: Profile picture update failed | _id: ${_id}`, LEVEL.ERROR);
        return false;
    }

    public static async crosscheckUsernameAndObjectID(username: string, _id: ObjectId) {
        consoleLog(`DATABASE LOG: Crosschecking username and ObjectID | username: ${username} && _id: ${_id}`, LEVEL.INFO);
        const result = await super.collections["user-account"].findOne({"credentials.username": username});
        if (result !== null) {
            if (result._id.equals(_id)) {
                consoleLog(`DATABASE LOG: Username and ObjectID match`, LEVEL.OK);
                return true;
            }
        }
        consoleLog(`DATABASE LOG: Username and ObjectID do not match`, LEVEL.ERROR);
        return false;
    }

    public static async getPublicProfile(_id?: ObjectId | null, username?: string, email?: string): Promise<PublicProfile | null> {
        consoleLog(`DATABASE LOG: Retrieving public profile for username: ${username} || _id: ${_id} || email: ${email}`, LEVEL.INFO);
        const result = await super.collections["user-account"].findOne(
            {
                $or: [
                    {"credentials.username": username},
                    {"_id": _id},
                    {"credentials.email": email}
                ]
            },
            {
                projection: {
                    full_name: 1,
                    "credentials.username": 1,
                    "credentials.email": 1,
                    gender: 1,
                    phone: 1,
                    occupation: 1,
                    social_connections: 1,
                    profile_picture: 1,

                }
            }
        );

        if (result !== null) {
            consoleLog(`DATABASE LOG: Public profile retrieved successfully for username: ${username} || _id: ${_id} || email: ${email}`, LEVEL.OK);
            return {
                full_name: result.full_name,
                username: result.credentials.username,
                email: result.credentials.email,
                gender: result.gender,
                phone: result.phone,
                occupation: result.occupation,
                social_connections: result.social_connections,
                profile_picture: result.profile_picture,
            };
        }
        consoleLog(`DATABASE LOG: Public profile retrieval failed for username: ${username} || _id: ${_id} || email: ${email}`, LEVEL.ERROR);
        return null;
    }

}