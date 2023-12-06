<script lang="ts">
    import {onMount} from "svelte";

    export let data
    let savedItems:any
    let dataFetched = false
    let savedNews = []
    let savedEvents = []
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



<main>
    {#if !dataFetched}
           <h1>Loading...</h1>
        {:else}
<h1>Saved Items</h1>
    <h2>News</h2>
    {#each savedNews as news}
    <div class="news">
        <h3>{news.title}</h3>
        <p>{news.content}</p>
        <p>{news.publish_date}</p>
    </div>
    {/each}
    {/if}
</main>