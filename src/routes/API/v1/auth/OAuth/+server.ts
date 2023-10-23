import {OAuth2Client} from "google-auth-library";
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from "$env/static/private";
import {redirect} from "@sveltejs/kit";
import consoleLog, {LEVEL} from "$lib/server/log";
import {Database} from "$lib/server/database";
import {USER_ROLE} from "$lib/client/utility";

export const GET = async ({url}: any) => {
    consoleLog("Oauth: Google OAuth2.0 Request Received", LEVEL.OK);
    const redirectURL: string = 'http://localhost:5173/API/v1/auth/OAuth';

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

    const result = await Database.getUserByEmail(email)
    if (result !== null) {
        consoleLog("User found", LEVEL.OK);
        if (result.credentials.google_id === "" || result.credentials.google_id !== google_id) {
            consoleLog("Google ID not set", LEVEL.WARN);
            await Database.updateGoogleID(email, google_id);
            /// TODO: Redirect to sign-in page with google_id
            throw redirect(302, "/sign-in/" + google_id);
        } else {
            /// Simply authenticate user
            throw redirect(302, "/sign-in/" + google_id);
        }
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
        const success = await Database.insertUser(userObject);
        if (success) {
            consoleLog("User created", LEVEL.OK);
            const new_user_id = success.insertedId.toString();
            consoleLog("New insertedID: " + new_user_id, LEVEL.OK);
            throw redirect(302, "/sign-in/" + new_user_id);
        }
    }
}