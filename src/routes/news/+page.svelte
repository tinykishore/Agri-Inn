<script lang="ts">
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";
    import {onMount} from "svelte";
    import {truncateSentence} from "$lib/client/utility";

    DynamicNavigation.set(DashboardNavigation);

    let news: any;
    onMount(async () => {
        const response = await fetch('/API/v1/news/GetAllNewsAPI');
        news = await response.json();
        console.log(news)
    });

</script>

<main class="my-20 mx-32">
    <div class="bg-gradient-to-bl from-amber-50 via-yellow-100 to-amber-100 w-full rounded-2xl p-6 flex items-center justify-center mb-8">
        <h1 class="text-4xl font-bold">News</h1>
    </div>

    {#if news === undefined}
        <div class="flex flex-col mx-0 gap-8">
            <h1>Loading...</h1>
        </div>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12 mx-0">
            {#each news as newss}
                <div class="flex flex-col justify-between bg-white p-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:bg-amber-100">
                    <div>
                        {#if newss.image_url}
                            <img src={newss.image_url} alt="" class="w-full h-52 object-cover mb-4 rounded-lg">
                        {/if}
                        <h2 class="text-xl font-bold mb-2 hover:underline">{newss.title}</h2>
                        <p class="text-gray-600">
                            {truncateSentence(newss.content)}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 mt-2">{newss.publish_date}</p>
                        <div class="flex mt-4">
                            {#each newss.tags as tag}
                                <div class="font-mono bg-gray-200 text-gray-800 px-3 py-1 text-sm rounded-2xl mr-2">#{tag}</div>
                            {/each}
                        </div>
                        <div class="flex items-center mt-4">
                            <a href="/news/{newss.u_id}" class="text-blue-500 hover:underline mr-4">Read More</a>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</main>




<!--<main class="my-20 mx-32">-->
<!--    {#if news === undefined}-->
<!--        <div class="flex flex-col my-12 mx-24 gap-8">-->
<!--            <h1>Loading...</h1>-->
<!--        </div>-->
<!--    {:else}-->
<!--        <div class="flex flex-col my-12 mx-24 gap-8">-->
<!--            {#each news as newss}-->
<!--                <p>{newss.title}</p>-->
<!--                <p>{newss.content}</p>-->
<!--                <p>{newss.publish_date}</p>-->
<!--                <div> {#each newss.tags as tags }-->
<!--                    <p> {tags} </p>-->
<!--                {/each}-->
<!--                    </div>-->


<!--            {/each}-->
<!--        </div>-->
<!--    {/if}-->
<!--</main>-->
