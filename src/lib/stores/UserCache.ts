import {writable} from "svelte/store";
import type {USER_ROLE} from "$lib/globals/globals";

export default writable({
    full_name: undefined,
    email: undefined,
    username: undefined,
    profile_picture: undefined,
    user_role: undefined,
});

export interface TypeUserCache {
    full_name: string | undefined
    email: string | undefined
    username: string | undefined
    profile_picture: string | undefined
    user_role: USER_ROLE | undefined
}