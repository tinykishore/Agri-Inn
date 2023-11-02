<script lang="ts">
    import DynamicNavigation, {search_navigation} from "$lib/stores/DynamicNavigation";
    import SearchNavigation from "$lib/components/dynamicNavigations/SearchNavigation.svelte";
    import search_bg from "$lib/assets/images/search_bg.jpg";
    import {truncateSentence} from "$lib/client/utility.js";

    let query = "";
    let search_results: any = {
        user_result: [],
        forum_result: []
    };

    DynamicNavigation.set(SearchNavigation);
    search_navigation.subscribe((value) => {
        query = value.query;
        search_results = value.search_results;
    });

</script>

<svelte:head>
	<title>Search</title>
	<meta name="description" content="Search for a specific page or post on the site." />
</svelte:head>

<section class="fixed bg-fixed top-0 left-0 h-screen w-screen -z-50">
	<img alt="sign-in-bg" class="w-full h-full bg-fixed object-cover" src="{search_bg}">
</section>

<main class="my-20 mx-32">
	<h1>Search For: {query} </h1>
	{#if query !== ""}
		<div class="flex flex-col gap-2">
			<h1 class="text-3xl font-black">User Accounts</h1>

			<div class="grid-cols-4 gap-3 grid">
				{#each search_results.user_result as user}
					<div class="flex gap-4 rounded-2xl w-full p-3 hover:bg-amber-200 hover:drop-shadow-sm transition-all duration-300 items-center justify-start align-middle">
						<img alt="" class="w-12 h-12 rounded-full" src={user.profile_picture}/>
						<div class="flex-col flex w-full justify-start align-middle items-start">
							<div class="flex-col flex w-full justify-start align-middle items-start">
								<div class="text-lg font-bold">{user.full_name}</div>
								<div class="text-sm font-medium text-zinc-500">{user.credentials.username}
									&bull; {user.credentials.email}</div>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<h1 class="text-3xl font-black">Forum</h1>

			{#each search_results.forum_result as forum}
				<div class="flex-col flex gap-1 rounded-2xl w-full p-3 hover:bg-amber-200 hover:drop-shadow-sm transition-all duration-300 justify-start align-middle">
					<h1 class="text-xl font-bold">{forum.title}</h1>
					<h1 class="">{truncateSentence(forum.post)}</h1>
					<h2 class="text-sm font-medium text-zinc-500">&bull; By {forum.author}</h2>
				</div>
			{/each}

		</div>
	{:else}
		<div class="flex flex-col gap-2">
			<h1 class="text-2xl">No Results Found</h1>
		</div>
	{/if}
</main>