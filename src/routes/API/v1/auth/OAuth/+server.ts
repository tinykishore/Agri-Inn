import {OAuth2Client} from "google-auth-library";
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET} from "$env/static/private";
import {redirect} from "@sveltejs/kit";
import consoleLog, {LEVEL} from "$lib/server/log";
import {USER_ROLE} from "$lib/client/utility";
import jwt from "jsonwebtoken";
import {generateToken} from "$lib/server/utility";
import {supabase} from "$lib/client/supabase";
import {ObjectId} from "mongodb";
import DatabaseAccount from "$lib/server/databaseObjects/DatabaseAccount";

export const GET = async ({url, cookies}: any) => {
    consoleLog("Oauth: Google OAuth2.0 Request Received", LEVEL.OK);
    const redirectURL: string = 'https://agriinn.vercel.app/API/v1/auth/OAuth';

    const code: any = url.searchParams.get('code');
    consoleLog("Code: " + code, LEVEL.WARN)

    const oAuth2Client: OAuth2Client = new OAuth2Client(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        redirectURL
    );

    const token = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(token.tokens);
    const user = oAuth2Client.credentials;

    consoleLog("User access token fetched [" + user.access_token + "]", LEVEL.OK);
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${user.access_token}`);
    const data = await response.json();
    consoleLog("User details fetched... {" + data.email + ", " + data.given_name + ", " + data.family_name + "}", LEVEL.OK);

    const full_name = data.name;
    const email = data.email;
    const profile_picture = data.picture;
    const google_id = data.sub;

    const result = await DatabaseAccount.getUserByEmail(email)
    if (result) {
        consoleLog("User found", LEVEL.OK);
        if (result.credentials.google_id === "" || result.credentials.google_id !== google_id) {
            consoleLog("Google ID not set", LEVEL.WARN);
            await DatabaseAccount.updateGoogleID(email, google_id);
        }

        consoleLog("Google ID set", LEVEL.OK);
        // Set token and cookie and redirect to dashboard
        const token: string = generateToken(
            {userObjectID: result._id}
        );
        cookies.set("sessionID", token, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
        });
        throw redirect(301, "/dashboard");

    } else {
        consoleLog("User not found", LEVEL.WARN);
        consoleLog("Creating new user", LEVEL.OK);

        // Create new user object
        const userObject: UserObject = {
            full_name: full_name,
            date_of_birth: "",
            gender: "",
            address: {
                street: "",
                city: "",
                state: "",
                zip: "",
                country: ""
            },
            phone: "",
            occupation: "",
            social_connections: null,
            credentials: {
                email: email,
                username: "",
                password_hash: "",
                password_reset_token: "",
                google_id: google_id
            },
            profile_picture: profile_picture,
            role: USER_ROLE.USER
        }

        // Insert new user object into database
        const success = await DatabaseAccount.insertUser(userObject);
        if (success) {
            consoleLog("User created", LEVEL.OK);
            const new_user_id = success.insertedId.toString();

            // Download profile picture
            const response = await fetch(profile_picture);
            const file = await response.blob();
            const file_name = new_user_id + ".jpg";

            // Upload profile picture to Supabase Storage
            const data = await supabase.storage.from('Agri-Inn').upload(file_name, file, {
                upsert: true,
            })

            // Get profile picture URL
            const URL = supabase.storage.from('Agri-Inn').getPublicUrl(file_name);
            const profile_picture_url = URL.data.publicUrl;

            // Update profile picture URL in database
            const new_user_objectID = new ObjectId(new_user_id);
            await DatabaseAccount.updateProfilePicture(new_user_objectID, profile_picture_url);

            consoleLog("New insertedID: " + new_user_id, LEVEL.OK);
            const encrypted_id = jwt.sign(
                {
                    new_user_id,
                    full_name,
                    email,
                    profile_picture,
                    google_id
                }, JWT_SECRET, {expiresIn: "30m"}
            );
            cookies.set("google_auth", encrypted_id, {
                path: "/",
                httpOnly: false,
                // 10 minutes
                maxAge: 60 * 10,
                sameSite: "lax"
            });
            throw redirect(302, "/sign-in/google");
        }
    }
}