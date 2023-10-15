import type {Handle} from "@sveltejs/kit";
import {databaseConnection, initializeDatabase} from "$lib/server/database";

export const handle: Handle = async ({event, resolve}) => {
    if (databaseConnection === null) await initializeDatabase();
    return resolve(event);
};