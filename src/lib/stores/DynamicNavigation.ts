import {writable} from 'svelte/store';
import DefaultNavigation from "$lib/components/dynamicNavigations/DefaultNavigation.svelte";
import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";

export default writable(DefaultNavigation || DashboardNavigation || null);

export let forum_id_navigation = writable({
    postObjectID: undefined,
    userObjectID: undefined,
    alreadyUpvoted: false,
    currentURL: "",
    totalLikes: 0,
    totalViews: 0,
    fontSize: 14,
    self: false,
});