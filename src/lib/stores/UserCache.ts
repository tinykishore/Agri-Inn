import {writable} from "svelte/store";
import type {USER_ROLE} from "$lib/client/utility";

export default writable({
    _id: undefined,
    full_name: undefined,
    email: undefined,
    username: undefined,
    profile_picture: undefined,
    user_role: undefined,
});