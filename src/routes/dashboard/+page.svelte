<script>
    import currentNavigation from "$lib/stores/currentNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";
    import username from "$lib/stores/username";
    currentNavigation.set(DashboardNavigation);
    export let data;
    username.set(data.username);
</script>

<main class="mt-12">
	{data.username} logged in
</main>

