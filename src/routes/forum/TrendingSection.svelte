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


<div class="flex flex-col gap-3 bg-amber-300/60 backdrop-blur-2xl rounded-2xl p-4 overflow-y-scroll">
	<h1 class="text-2xl font-bold text-amber-800 mb-2">Trending Topics</h1>
	{#if !isLoaded}
		{#each Array(3) as _, i}
			<div role="status" class="rounded-xl shadow-xl animate-pulse p-4 bg-white/70 ">
				<div class="flex items-center gap-4 mb-4">
					<svg class="w-10 h-10 text-gray-300" aria-hidden="true"
						 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
						<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
					</svg>
					<div>
						<div class="h-2.5 bg-gray-300 rounded-full  w-32 mb-2"></div>
						<div class="w-48 h-2 bg-gray-300 rounded-full "></div>
					</div>
				</div>
				<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
				<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5">

				</div>

			</div>
		{/each}
	{:else}
		{#each mostLikedPosts as item}
			<div class="bg-amber-100 p-3 rounded-xl shadow-xl">
				<div class="flex flex-col">
					<p class="font-bold">{item.author}</p>
					<p class="text-sm font-bold">{item.timestamp}</p>
					<p>{item.title}</p>
				</div>
			</div>
		{/each}
	{/if}
</div>

