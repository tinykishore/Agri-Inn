<script>
	import currentNavigation from "$lib/stores/currentNavigation";
	import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";
	import {isUserCacheValid, USER_ROLE} from "$lib/globals/globals.js";
	import {onMount} from "svelte";
	import UserCache from "$lib/stores/UserCache";

	currentNavigation.set(DashboardNavigation);
    export let data;

	onMount(async () => {
		if (!isUserCacheValid()){
			UserCache.update(value => {
				value.full_name = data.full_name;
				value.email = data.email;
				value.profile_picture = data.profile_picture;
				value.username = data.username;
				value.role = data.user_role;
				return value;
			});
		}
	})
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Dashboard">
</svelte:head>

<main class="mt-12">
	{data.full_name} logged in
	<h1>Sitemap</h1>
	<div class="flex gap-4 bg-amber-100 rounded-xl">
		<a href="/farms">Farms</a>
		<a href="/forum">Forum</a>
		{#if data.user_role === USER_ROLE.OWNER}
			<a href="/loan">Loan</a>
		{/if}
		<a href="/news">News</a>
		<a href="/marketplace">Marketplace</a>
	</div>
</main>

