<script lang="ts">
    import currentNavigation from "$lib/stores/currentNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";
    import {onMount} from "svelte";
    import logo from "$lib/assets/icons/logo.svg";
    import forum_art from "$lib/assets/images/forum-art.svg";
    import heart_icon from "$lib/assets/icons/heart-icon.svg";
    import view_icon from "$lib/assets/icons/view-icon.svg";


    currentNavigation.set(DashboardNavigation);

    let news: any;
    onMount(async () => {
        const response = await fetch('/API/v1/news/GetAllNewsAPI');
        news = await response.json();
        console.log(news)
    });

</script>

<main class="my-20 mx-32">
    {#if true}
        {#each news as post}
            <h1 class=" col-span-3 text-2xl font-bold text-center text-gray-400">{post.title}</h1>

        {/each}
    {:else}
        <h1 class=" col-span-3 text-2xl font-bold text-center text-gray-400">No posts yet</h1>
    {/if}
</main>
