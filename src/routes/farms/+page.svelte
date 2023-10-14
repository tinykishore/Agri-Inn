<script lang="ts">
    import currentNavigation from "$lib/stores/currentNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";
    import {onMount} from "svelte";
    import {isUserCacheValid} from "../../globals";
    import UserCache from "$lib/stores/UserCache";
    currentNavigation.set(DashboardNavigation);

    export let data

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

    let farms: any;
    onMount(async () => {
        const response = await fetch('/API/v1/farms/GetFarmsAPI');
        farms = await response.json();
    });

</script>

<main class="my-24">
	{#if farms === undefined}
		<div class="flex flex-col my-12 mx-24 gap-8">
			<h1>Loading...</h1>
		</div>
	{:else}
		<div class="flex flex-col my-12 mx-24 gap-8">
			{#each farms as farm}
				<a href="/farms/{farm.uid}">{farm.farm_name}</a>
			{/each}
		</div>
	{/if}
</main>