<script>
	import currentNavigation from "$lib/stores/currentNavigation";
    import AboutNavigation from "$lib/components/dynamicNavigations/AboutNavigation.svelte";
    currentNavigation.set(AboutNavigation);

</script>


<main class="h-[1000px]">
	Hello
</main>