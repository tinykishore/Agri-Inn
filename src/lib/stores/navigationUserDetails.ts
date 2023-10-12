// store username in a store
import {writable} from "svelte/store";
export default writable({
    full_name: "",
    email: "",
    profile_picture: "",
});