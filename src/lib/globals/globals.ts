import UserCache from "$lib/stores/UserCache";

/**
 * Enumeration representing user roles.
 * @enum {number}
 */
export enum USER_ROLE {
    ADMIN = 0,
    USER = 1,
    OWNER = 2
}

export function isUserCacheValid(): boolean {
    let username, email, full_name, profile_picture, user_role;
    UserCache.subscribe((value) => {
        username = value.username;
        email = value.email;
        full_name = value.full_name;
        profile_picture = value.profile_picture;
        user_role = value.user_role;
    });
    return username !== undefined &&
        email !== undefined &&
        full_name !== undefined &&
        profile_picture !== undefined &&
        user_role !== undefined;
}

export function invalidateUserCache(): void {
    UserCache.set({
        username: undefined,
        email: undefined,
        full_name: undefined,
        profile_picture: undefined,
        user_role: undefined,
    });
}
