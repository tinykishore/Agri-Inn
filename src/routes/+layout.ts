import {isUserCacheValid} from "$lib/globals/globals";
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
 * @returns {Promise<{ url: any }>} A Promise that resolves with an object containing the URL's pathname.
 */
export let load = async ({url, parent, data, fetch}: any): Promise<{ url: any }> => {
    await parent();

    // Try load USER_CACHE from localStorage
    if (!isUserCacheValid()) {
        // TODO: API call to get user data, set user cache
        const response = await fetch('/API/v1/auth/RetrieveCache', {
            method: 'POST',
            body: JSON.stringify(data.userID),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const json = await response.json();
            UserCache.set(json);
        } else {
            console.log(response);
        }
    }

    return {
        url: url.pathname
    }
}