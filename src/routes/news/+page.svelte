<script lang="ts">
    import currentNavigation from "$lib/stores/currentNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";
    import {onMount} from "svelte";

    currentNavigation.set(DashboardNavigation);

    let news: any;
    onMount(async () => {
        const response = await fetch('/API/v1/news/GetAllNewsAPI');
        news = await response.json();
        console.log(news)
    });

</script>

<main class="my-20 mx-32">
    {#if news === undefined}
        <div class="flex flex-col my-12 mx-24 gap-8">
            <h1>Loading...</h1>
        </div>
    {:else}
        <div class="flex flex-col my-12 mx-24 gap-8">
            {#each news as newss}
                <p>{newss.title}</p>
                <p>{newss.content}</p>
                <p>{newss.publish_date}</p>
                <div> {#each newss.tags as tags }
                    <p> {tags} </p>
                {/each}
                    </div>


            {/each}
        </div>
    {/if}
</main>
