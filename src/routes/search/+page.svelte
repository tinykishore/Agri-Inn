<script lang="ts">
    import DynamicNavigation, {search_navigation} from "$lib/stores/DynamicNavigation";
    import SearchNavigation from "$lib/components/dynamicNavigations/SearchNavigation.svelte";
    import search_bg from "$lib/assets/images/search_bg.jpg";
    import {truncateSentence} from "$lib/client/utility.js";
    import search_cartoon from "$lib/assets/images/search_cartoon.png";

    let query = "";
    let search_results: any;

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
	<img alt="" class="w-full h-full bg-fixed object-cover" src="{search_bg}">
</section>

<main class="my-20 mx-32">
	{#if query !== ""}
		<div class="flex flex-col gap-2">
			{#if (search_results.user_result.length !== 0)}
				<h1 class="text-3xl font-black text-amber-950">User Accounts</h1>
				<div class="grid-cols-3 gap-3 grid">
					{#each search_results.user_result as user}
						<a href="/{user.credentials.username}"
						   class="flex gap-4 rounded-2xl w-full px-5 py-3 hover:bg-amber-200 hover:drop-shadow-sm transition-all duration-300 items-center justify-start align-middle">
							<img alt="" class="w-12 h-12 rounded-full" src={user.profile_picture}/>
							<div class="flex-col flex w-full justify-start align-middle items-start">
								<div class="flex-col flex w-full justify-start align-middle items-start">
									<div class="text-lg font-bold">{user.full_name}</div>
									<div class="text-sm font-medium text-zinc-500">{user.credentials.username}
										&bull; {user.credentials.email}</div>
								</div>
							</div>
						</a>
					{/each}
				</div>
			{/if}


			{#if (search_results.forum_result.length !== 0)}
			<h1 class="text-3xl font-black text-amber-950">Forum</h1>
				<div class="grid-cols-3 gap-3 grid">
					{#each search_results.forum_result as forum}
						<div class="flex-col flex gap-1 rounded-2xl w-full p-3 bg-amber-100 hover:bg-amber-200 hover:drop-shadow-sm transition-all duration-300 justify-start align-middle">
							aa <h1 class="text-xl font-bold">{forum.title}</h1>
							<h1 class="">{truncateSentence(forum.post)}</h1>
							<h2 class="text-sm font-medium text-zinc-500">&bull; By {forum.author}</h2>
						</div>
					{/each}
				</div>
			{/if}

			{#if (search_results.event_result.length !== 0)}
				<h1 class="text-3xl font-black text-amber-950">Events</h1>
				{#each search_results.event_result as event}
					<div class="flex-col flex gap-1 rounded-2xl w-full p-3 hover:bg-amber-200 hover:drop-shadow-sm transition-all duration-300 justify-start align-middle">
						<h1 class="text-xl font-bold">{event.event_name}</h1>
						<h1 class="">{truncateSentence(event.description)}</h1>
						<h2 class="text-sm font-medium text-zinc-500">&bull; On {event.event_date}</h2>
					</div>
				{/each}
			{/if}

			{#if (search_results.news_result.length !== 0)}
				<h1 class="text-3xl font-black text-amber-950">News</h1>
				{#each search_results.news_result as news}
					<div class="flex-col flex gap-1 rounded-2xl w-full p-3 hover:bg-amber-200 hover:drop-shadow-sm transition-all duration-300 justify-start align-middle">
						<h1 class="text-xl font-bold">{news.title}</h1>
						<h2 class="text-sm font-medium text-zinc-500">&bull; On {news.publish_date}</h2>
					</div>
				{/each}
			{/if}
		</div>
	{:else if query === ""}
		<div class="flex flex-col items-center justify-center align-middle gap-2 text-center">
			<h1 class="text-2xl font-bold text-amber-950">Type anything to search</h1>
			<img alt="" class="w-96 " src="{search_cartoon}">
		</div>
	{/if}
</main>