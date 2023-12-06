import {isUserCacheValid} from "$lib/client/utility";
import UserCache from "$lib/stores/UserCache";

/**
 * Load user data set the user cache if the cache is invalid and pass url.pathname to +layout.svelte.
 * THE USE OF THIS LOAD FUNCTION IS TO SET THE USER CACHE CALLING THE RetrieveCache[POST] API.
 * DO NOT USE THIS LOAD FUNCTION TO REDIRECT THE USER.
 * FOR REDIRECTING THE USER, USE THE load FUNCTION IN src/routes/+page.server.ts.
 * URL IS PASSED BECAUSE IT IS NEEDED IN +layout.svelte TO PAGE ANIMATION.
 *
 * @param {Object} options - The options object.
 * @param {URL} options.url - The URL object for extracting the pathname.
 * @param {Function} options.parent - A function representing the parent process.
 * @param {Object} options.data - Data for the API call.
 * @param {Function} options.fetch - A function for making fetch requests.
 */
export let load = async ({url, parent, data, fetch}: any) => {
    await parent();

    // Try load USER_CACHE
    if (!isUserCacheValid() && data.userObjectID) {
        const response: any = await fetch('/API/v1/auth/RetrieveCache', {
            method: 'POST',
            body: JSON.stringify(data.userObjectID),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const cache = await response.json();
            UserCache.set(cache);
        }
    }

    let got_username: any = null;

    // Try load NOTIFICATIONS
    UserCache.subscribe((value) => {
        got_username = value.username;
    });


    let got_notification: any;
    if (got_username) {
        const response = await fetch('/API/v1/GetNotificationAPI', {
            method: "POST",
            body: JSON.stringify({
                "username": got_username
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        got_notification = await response.json();
    }

    return {
        url: url.pathname,
        notifications: got_notification
    }
}