import type {Handle} from "@sveltejs/kit";
import {databaseConnection, initializeDatabaseConnection} from "$lib/server/database_v3";

export const handle: Handle = async ({event, resolve}) => {
    if (databaseConnection === null) await initializeDatabaseConnection();
    return resolve(event);
};