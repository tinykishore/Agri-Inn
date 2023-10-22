<script>
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import SearchNavigation from "$lib/components/dynamicNavigations/SearchNavigation.svelte";
    DynamicNavigation.set(SearchNavigation);
</script>

<svelte:head>
	<title>Search</title>
	<meta name="description" content="Search for a specific page or post on the site." />
</svelte:head>

<main class="h-[1000px]">
	Hello
</main>