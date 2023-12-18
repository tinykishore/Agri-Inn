<script lang="ts">
    import {onMount} from "svelte";

    export let data
    let savedItems:any
    let dataFetched = false
    let savedNews:any = []
    let savedEvents:any = []
    let singleNews

    onMount(async () => {
        const response = await fetch('/API/v1/savedItemsAPI',{
            method: "POST",
            body: (JSON.stringify(data._id)),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        savedItems = await response.json();

        for (let i = 0; i < savedItems.saved_news.length; i++) {
            console.log(savedItems.saved_news[i])
            const news_response = await fetch('/API/v1/news/GetOneNewsAPI', {
                method: 'POST',
                body: JSON.stringify(savedItems.saved_news[i]),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            singleNews = await news_response.json();
            savedNews.push(singleNews)

        }
        console.log(savedNews)
        dataFetched = true
    });

</script>



<main class="my-20 mx-32">
    {#if !dataFetched}
        <div class="text-center animate__animated animate__flash">
            <h1 class="text-xl font-semibold text-gray-600">
                Loading...
            </h1>
        </div>
    {:else}
        <h1 class="text-4xl font-bold text-center text-gray-800 mb-6">Saved Items</h1>
        <h2 class="text-2xl font-semibold mb-4">News</h2>
        {#each savedNews as news}
            <div class="bg-gradient-to-bl from-amber-50 via-yellow-100 to-amber-100 rounded-lg p-4 mb-4">
                <h3 class="text-xl font-extrabold text-yellow-500 mb-2">{news.title}</h3>
                <p class="text-gray-500">{news.publish_date}</p>
            </div>
        {/each}
    {/if}
</main>
