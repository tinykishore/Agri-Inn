import {OAuth2Client} from "google-auth-library";
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from "$env/static/private";
import {redirect} from "@sveltejs/kit";
import consoleLog, {LEVEL} from "$lib/server/log";
import {isAuthorized} from "$lib/server/utility";

export const load = async ({cookies}: any) => {
    // Get cookie value "sessionID"
    const sessionID = cookies.get('sessionID');
    const authorized = isAuthorized(sessionID);
    if (!authorized) {
        consoleLog("User not authorized", LEVEL.ERROR);
        return Promise.resolve()
    }
    consoleLog("User authorized", LEVEL.OK)
    throw redirect(301, "/dashboard");
}

export const actions = {
    default: async ({}) => {
        consoleLog("Oauth: Google OAuth2.0 Request Received", LEVEL.OK);

        // This is the URL that Google will call back to with the auth code appended to the query string.
        // FIXME: CHANGE THIS TO YOUR ACTUAL DOMAIN NAME
        const redirectURL = 'https://agriinn.vercel.app/API/v1/auth/OAuth';
        consoleLog(`Oauth: RedirectURL = ` + redirectURL, LEVEL.OK);


        // Create an OAuth2Client object from the credentials in our private file.
        const oAuth2Client = new OAuth2Client(
            GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectURL
        );

        // Generate the URL that Google will use to ask the user for consent.
        const authorizeURL = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile email',
            prompt: 'consent',
        });

        // Redirect the user to the consent screen.
        consoleLog("Redirecting to consent screen [" + authorizeURL + "]", LEVEL.OK);
        throw redirect(302, authorizeURL);
    }
}