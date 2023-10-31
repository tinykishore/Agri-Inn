<script lang="ts">
    import {afterUpdate, onMount} from "svelte";
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import {formatEpochToCustom} from "$lib/client/utility";
    import UserCache from "$lib/stores/UserCache";
    import Forum_ID_Navigation from "$lib/components/dynamicNavigations/forum/Forum_ID_Navigation.svelte";
    import {forum_id_navigation} from "$lib/stores/DynamicNavigation.js";
    import DefaultNavigation from "$lib/components/dynamicNavigations/DefaultNavigation.svelte";
    import {fade} from "svelte/transition";

    DynamicNavigation.set(DefaultNavigation);

    export let data;
    let news_detail :any;
    let news_data = false;



    onMount(async () => {
        const news_response = await fetch('/API/v1/news/GetOneNewsAPI', {
            method: 'POST',
            body: JSON.stringify(data.newsObjectID),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        news_detail = await news_response.json();
        console.log(news_detail)

        news_data= true;
    })



</script>


<main class="my-28 mx-64">
    {#if news_data}
        <div class="flex flex-col gap-4">
<!--            <img alt="" class="rounded-2xl object-cover w-full h-full" src={news.image_url} />-->
            <h1 class="text-5xl font-bold">{news_detail.title}</h1>

                <p in:fade id="post_body" class="whitespace-pre-line hover:antialiased p-1">{news_detail.content}</p>


            <hr class="border-2 rounded-full w-full">
            {news_detail._id}
        </div>

    {:else}
        <div>
            <h1>Loading Story</h1>
        </div>
    {/if}

</main>