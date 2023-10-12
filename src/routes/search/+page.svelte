<script>
    import currentNavigation from "$lib/stores/currentNavigation";
    import SearchNavigation from "$lib/components/dynamicNavigations/SearchNavigation.svelte";
    currentNavigation.set(SearchNavigation);
</script>


<main class="h-[1000px]">
	Hello
</main>