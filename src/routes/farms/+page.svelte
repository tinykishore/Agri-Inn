<script lang="ts">
    import {onMount} from "svelte";

    // export let data

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