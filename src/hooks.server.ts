import type {Handle} from "@sveltejs/kit";
import {initializeDatabaseConnection, isDatabaseConnectionInitialized} from "$lib/server/Database";

/**
 * A SvelteKit server function to handle incoming requests.
 */
export const handle: Handle = async ({event, resolve}) => {
    if (!isDatabaseConnectionInitialized()) await initializeDatabaseConnection();
    return resolve(event);
};