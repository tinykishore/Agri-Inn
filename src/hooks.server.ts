import type {Handle} from "@sveltejs/kit";
import {initializeDatabaseConnection, isDatabaseConnectionInitialized} from "$lib/server/database";

export const handle: Handle = async ({event, resolve}) => {
    if (!isDatabaseConnectionInitialized())
        await initializeDatabaseConnection();
    return resolve(event);
};