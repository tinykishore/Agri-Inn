import UserCache from "$lib/stores/UserCache";

/**
 * Enumeration representing user roles.
 * @enum {number}
 */
export enum USER_ROLE {
    /**
     * Administrator role.
     * @type {number}
     */
    ADMIN = 0,

    /**
     * Regular user role.
     * @type {number}
     */
    USER = 1,

    /**
     * Owner role.
     * @type {number}
     */
    OWNER = 2
}

export function isUserCacheValid(): boolean {
    let username, email, full_name, profile_picture, role;
    UserCache.subscribe((value) => {
        username = value.username;
        email = value.email;
        full_name = value.full_name;
        profile_picture = value.profile_picture;
        role = value.role;
    });
    return username !== "" && email !== "" && full_name !== "" && profile_picture !== "" && role !== "";
}