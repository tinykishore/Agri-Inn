<script lang="ts">
    import currentNavigation, {uid} from "$lib/stores/currentNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";
    import {isUserCacheValid, USER_ROLE} from "$lib/globals/globals";
    import {onMount} from "svelte";
    import type {TypeUserCache} from "$lib/stores/UserCache";
    import UserCache from "$lib/stores/UserCache";

    export let data;
    uid.set(data._id);
    currentNavigation.set(DashboardNavigation);

    let userCache: TypeUserCache;

    UserCache.subscribe(value => {
        userCache = value;
    })

	onMount(async () => {
		if (!isUserCacheValid()){
            // TODO: API call to get user data, set user cache
            const response = await fetch('/API/v1/auth/RetrieveCache', {
                method: 'POST',
                body: JSON.stringify(data._id),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const json = await response.json();
                UserCache.set(json);
            } else {
                console.log(response);
            }
		}
	})
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Dashboard">
</svelte:head>

<main class="mt-12">
	{data._id} logged in
	<div class="bg-amber-100 rounded-2xl shadow-xl">
		{userCache.full_name}
		{userCache.email}
		{userCache.username}
		{userCache.profile_picture}
		{userCache.role}
	</div>
	<h1>Sitemap</h1>
	<div class="flex gap-4 bg-amber-100 rounded-xl">
		<a href="/farms">Farms</a>
		<a href="/forum">Forum</a>
		<!--		FIXME: Sketchy-->
		{#if userCache.role === USER_ROLE.OWNER}
			<a href="/loan">Loan</a>
		{/if}
		<a href="/news">News</a>
		<a href="/marketplace">Marketplace</a>
	</div>
</main>

