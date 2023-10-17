<script lang="ts">
    import {onMount} from "svelte";

    export let posts: any;

    let isLoaded = false;

    onMount(async () => {
        setTimeout(() => {
            isLoaded = true
        }, 1000)
    })

    function formatEpochToCustom(epoch: number): string {
        const date = new Date(epoch * 1000); // Convert epoch to milliseconds
        const day = date.getDate();
        const month = date.toLocaleString('default', {month: 'short'});
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const daySuffix = getDaySuffix(day);
        return `${day}${daySuffix} ${month} ${year}, ${hours.toString().padStart(2, '0')}.${minutes.toString().padStart(2, '0')}`;
    }

    function getDaySuffix(day: number): string {
        if (day >= 11 && day <= 13) {
            return 'th';
        }
        switch (day % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    }

</script>

<div class="mt-12">
	<h1 class="text-3xl font-black text-amber-800 text-center mb-10">Recent Posts of Agri-Inn Community</h1>
	<div class="grid grid-cols-3 gap-4">
		{#if !isLoaded}
			{#each Array(6) as _, i}
				<div role="status" class="rounded-xl animate-pulse p-4 bg-white/70 ">
					<div class="flex items-center gap-4 mb-4">
						<svg class="w-11 h-11 text-gray-300" aria-hidden="true"
							 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
							<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
						</svg>
						<div>
							<div class="h-2.5 bg-gray-300 rounded-full w-32 mb-2"></div>
							<div class="w-48 h-2 bg-gray-300 rounded-full "></div>
						</div>
					</div>
					<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
					<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5">
					</div>
				</div>
			{/each}
{:else}
			{#each posts as post}
				<a class="group rounded-xl p-4 bg-white/60 backdrop-blur-lg hover:scale-[1.03] hover:shadow-xl hover:bg-amber-200 transition-all duration-300"
				   href="/forum/{post._id}">
					<div class="flex items-center gap-4 mb-2">
						<img class="w-11 h-11 rounded-full" src="https://avatars.githubusercontent.com/u/59497705?v=4"
							 alt=""/>
						<div>
							<div class="font-bold group-hover:text-amber-600 transition-all duration-300">{post.author}</div>
							<div class="font-light text-sm text-zinc-400">Posted on {formatEpochToCustom(post.timestamp)}</div>
						</div>
					</div>
					<div class="font-bold group-hover:text-amber-600 transition-all duration-300"
						 style="font-size: 1.10rem">{post.title}</div>
					<div class="font-light text-sm">{post.post}</div>
				</a>
			{/each}
		{/if}
	</div>
</div>