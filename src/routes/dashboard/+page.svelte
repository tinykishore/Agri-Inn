<script lang="ts">
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";
    import {onMount} from "svelte";
    import UserCache from "$lib/stores/UserCache";

    DynamicNavigation.set(DashboardNavigation);

    let userCache: TypeUserCache | undefined;

    UserCache.subscribe(value => {
        userCache = value;
    })

	onMount(async () => {
        // something
	})
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Dashboard">
</svelte:head>

<main class="my-20 mx-32">

	<div class="grid-cols-3 grid gap-4">
		<div class="col-span-2 bg-amber-100 w-full p-4 rounded-2xl">
			User Greetings

			{userCache?.full_name}
			{userCache?.email}
			{userCache?.username}
			{userCache?.profile_picture}
			{userCache?.user_role}
		</div>
		<div class="bg-orange-200 p-4 rounded-2xl flex flex-col gap-2">
			<div class="flex flex-col gap-1">
				<h1 class="text-xl font-bold antialiased text-end text-amber-900">Quick Links</h1>
				<h1 class="mb-2 text-sm font-bold antialiased text-end bg-gradient-to-bl from-amber-900 to-amber-700 text-transparent bg-clip-text">
					Suggested From Your Activity
				</h1>
			</div>

			<a class="rounded-2xl bg-zinc-50 p-4" href="/farms">
				<h1 class="text-xl font-bold antialiased text-amber-900">Farms</h1>
				<h1 class="text-sm font-bold antialiased text-amber-900">Manage your farms</h1>
			</a>

			<a class="rounded-2xl bg-zinc-50 p-4" href="/forum">
				<h1 class="text-xl font-bold antialiased text-amber-900">Forum</h1>
				<h1 class="text-sm font-bold antialiased text-amber-900">Join the community</h1>
			</a>

			<a class="rounded-2xl bg-zinc-50 p-4" href="/marketplace">
				<h1 class="text-xl font-bold antialiased text-amber-900">Marketplace</h1>
				<h1 class="text-sm font-bold antialiased text-amber-900">Buy and sell your crops</h1>
			</a>

			<a class="rounded-2xl bg-zinc-50 p-4" href="/news">
				<h1 class="text-xl font-bold antialiased text-amber-900">News</h1>
				<h1 class="text-sm font-bold antialiased text-amber-900">Stay updated with latest livestock news</h1>
			</a>

			<a class="rounded-2xl bg-zinc-50 p-4" href="/events">
				<h1 class="text-xl font-bold antialiased text-amber-900">Events</h1>
				<h1 class="text-sm font-bold antialiased text-amber-900">View recent livestock events</h1>
			</a>




		</div>
	</div>
	<div class="bg-amber-100 rounded-2xl shadow-xl">

	</div>
	<h1>Sitemap</h1>
	<div class="flex gap-4 bg-amber-100 rounded-xl">
		<a href="/marketplace">Marketplace</a>
	</div>
</main>

