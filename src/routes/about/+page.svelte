<script>
	import currentNavigation from "$lib/stores/currentNavigation";
    import AboutNavigation from "$lib/components/dynamicNavigations/AboutNavigation.svelte";
    currentNavigation.set(AboutNavigation);

</script>

<svelte:head>
	<title>About Us</title>
	<meta name="description" content="About Us">
</svelte:head>

<main class="h-[1000px]">
	Hello
</main>