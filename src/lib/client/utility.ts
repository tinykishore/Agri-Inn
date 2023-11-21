import UserCache from "$lib/stores/UserCache";

/**
 * Enumeration representing user roles.
 * @enum {number}
 */
export enum USER_ROLE {
    ADMIN,
    USER,
    OWNER
}

export enum PAYMENT_METHOD {
    CARD_PAYMENT,
    BKASH,
    COD
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
        _id: undefined,
        username: undefined,
        email: undefined,
        full_name: undefined,
        profile_picture: undefined,
        user_role: undefined,
    });
}

export function formatEpochToCustom(epoch: number): string {
    const date: Date = new Date(epoch * 1000); // Convert epoch to milliseconds
    const day: number = date.getDate();
    const month: string = date.toLocaleString('default', {month: 'short'});
    const year: number = date.getFullYear();
    const hours: number = date.getHours();
    const minutes = date.getMinutes();

    const daySuffix: string = getDaySuffix(day);
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

export function truncateSentence(sentence: string): string {
    // Split the sentence into words
    const words: string[] = sentence.split(' ');
    // Check if the sentence has more than the word limit
    if (words.length > 32) {
        // Join the first 'wordLimit' words and add '...' at the end
        return words.slice(0, 28).join(' ') + ' ...';
    } else {
        // If the sentence has fewer words, return it as is
        return sentence;
    }
}

export function isValidURL(str: any) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}

export function isSecureURL(str: string) {
    const pattern = new RegExp('^(https:\\/\\/)');
    return pattern.test(str);
}

export function isInsecureURL(str: string) {
    const pattern = new RegExp('^(http:\\/\\/)');
    return pattern.test(str);
}

export function makeURL(text: string) {
    if (isSecureURL(text)) {
        return text;
    }
}

export function isUnseenNotification(notification: any[]) {
    return notification.some((value) => {
        return !value.seen;
    });
}

