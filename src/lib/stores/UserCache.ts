import {writable} from "svelte/store";

export default writable({
    full_name: "",
    email: "",
    username: "",
    profile_picture: "",
    role: "",
});