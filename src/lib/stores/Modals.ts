import {writable} from "svelte/store";

export let modals = writable({
    farms_farm_product_modal: false,
    events_event_id_modal: false,
});