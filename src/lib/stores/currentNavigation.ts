import {writable} from 'svelte/store';
import DefaultNavigation from "$lib/components/dynamicNavigations/DefaultNavigation.svelte";
import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";

export default writable(DefaultNavigation || DashboardNavigation || null);

export const user = writable({
    email: '',
    full_name: '',
    profile_picture: '',
    role: null
})