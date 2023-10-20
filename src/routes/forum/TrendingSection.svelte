<script lang="ts">
    import {onMount} from "svelte";
    import heart_icon from "$lib/assets/icons/heart-icon.svg";
    import view_icon from "$lib/assets/icons/view-icon.svg";
    import trending_icon from "$lib/assets/icons/trending-icon.svg";


    export let mostLikedPosts: any;

    let isLoaded = false;

    onMount(() => {
        setTimeout(()=>{
            isLoaded = true
		}, 1000)
    });



    function formatEpochToCustom(epoch: number): string {
        const date = new Date(epoch * 1000); // Convert epoch to milliseconds
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
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


<div class="flex flex-col gap-3 bg-amber-300/60 backdrop-blur-2xl rounded-2xl p-6 overflow-y-scroll align-middle">
	<div class="flex justify-start align-middle gap-2 items-center">
		<img class="h-6 w-6" src={trending_icon} alt=""/>
		<h1 class="text-2xl font-bold text-amber-900 bg-gradient-to-l from-amber-800 to-amber-600 text-transparent bg-clip-text ">
			Trending Topics</h1>

	</div>
	{#if !isLoaded}
		{#each Array(3) as _, i}
			<div role="status" class="rounded-xl animate-pulse p-4 bg-white/70 ">
				<div class="flex items-center gap-4 mb-[1.32rem]">
					<div>
						<div class="h-4 bg-gray-300 rounded-full w-80 mb-2"></div>
						<div class="w-24 h-4 bg-gray-300 rounded-full "></div>
					</div>
				</div>
				<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
				<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5">
				</div>
			</div>
		{/each}
	{:else}
		{#if mostLikedPosts.length > 0}
		{#each mostLikedPosts as post}
			<a class="rounded-xl p-4 bg-white hover:bg-amber-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group" href="/forum/{post._id}">
				<div class="font-bold mb-1 group-hover:text-amber-800 transition-all duration-300 text-xl">{post.title}</div>

				<div class="flex items-center gap-1 mb-2">
					<div class="font-light text-sm text-zinc-400">Posted on {formatEpochToCustom(post.timestamp)} by
						<span>
							<a class=" text-black font-medium text-sm group-hover:text-amber-600 transition-all duration-300"
							   href="/profile/{post.author}">{post.author}</a>
						</span></div>
				</div>

				<div class="flex gap-4 justify-start items-center align-middle">
					<div class="flex gap-2 justify-between align-middle items-center">
						<img class="h-4 w-4" src={heart_icon} alt=""/>
						<h1 class="text-sm font-bold">{post.like}</h1>
					</div>

					<div class="flex gap-2 justify-between align-middle items-center">
						<img class="h-5 w-5" src={view_icon} alt=""/>
						<h1 class="text-sm font-bold">{post.viewCount}</h1>
					</div>
				</div>

			</a>
		{/each}
		{:else}
			<h1 class="text-2xl font-bold text-center text-gray-400">No posts yet</h1>
		{/if}
	{/if}
</div>

