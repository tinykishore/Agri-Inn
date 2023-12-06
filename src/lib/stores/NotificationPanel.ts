import {writable} from "svelte/store";

export let notificationPanel = writable({
    show_notification: false,
});