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


export function formatEpochToCustom(epoch: number): string {
    const date = new Date(epoch * 1000); // Convert epoch to milliseconds
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'short'});
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const daySuffix = getDaySuffix(day);
    return `${day}${daySuffix} ${month} ${year}, ${hours.toString().padStart(2, '0')}.${minutes.toString().padStart(2, '0')}`;
}

function getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}

export function truncateSentence(sentence: string) {
    // Split the sentence into words
    const words = sentence.split(' ');

    // Check if the sentence has more than the word limit
    if (words.length > 32) {
        // Join the first 'wordLimit' words and add '...' at the end
        return words.slice(0, 28).join(' ') + ' ...';
    } else {
        // If the sentence has fewer words, return it as is
        return sentence;
    }
}