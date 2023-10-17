import {writable} from "svelte/store";
import type {USER_ROLE} from "$lib/globals/globals";

export default writable({
    full_name: "",
    email: "",
    username: "",
    profile_picture: "",
    role: 0,
});

export interface TypeUserCache {
    full_name: string
    email: string
    username: string
    profile_picture: string
    role: USER_ROLE
}