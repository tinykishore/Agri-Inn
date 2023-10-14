<script lang="ts">
    import {onMount} from "svelte";

    export let mostLikedPosts: any;

    let isLoaded = false;

    onMount(() => {
        // Loop through all the array and get profile picture by username.
        // Make the card with necessary
        // once everything is loaded, make `isLoaded` true

    });

</script>

{#if isLoaded}
	<h1> Loading Posts </h1>
{:else}
	<div class="flex flex-col gap-3 bg-amber-300/60 backdrop-blur-2xl rounded-2xl p-4 overflow-y-scroll">
		<h1 class="text-2xl font-bold text-amber-800">Trending Topics</h1>
		{#each mostLikedPosts as item}
			<div class="bg-amber-100 p-3 rounded-xl shadow-xl">
				<div class="flex flex-col">
					<p class="font-bold">{item.author}</p>
					<p class="text-sm font-bold">{item.timestamp}</p>
					<p>{item.title}</p>
				</div>
			</div>
		{/each}
	</div>
{/if}