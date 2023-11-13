<script lang="ts">
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";
    import {onMount} from "svelte";
    import Temp from "./Temp.svelte";
    import Chat from "../chat/Chat.svelte";

    //export let data
    DynamicNavigation.set(DashboardNavigation);

    export let data;

    let selectedProduct = '';

    let healthInfo: any;
    onMount(async () => {
        const response = await fetch('/API/v1/getProductCatalogAPI',{
            method: "POST",
            body: JSON.stringify({
                owner_id: data._id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        healthInfo = await response.json();
        console.log(healthInfo);
    });

</script>

<main class="my-24" >
    {#if healthInfo === undefined}
        <div class="flex flex-col my-12 mx-24 gap-8">
            <h1>Loading...</h1>
        </div>
    {:else}
        <div class="grid grid-cols-3 gap-6">
            <div class="flex flex-col gap-2">
                {healthInfo._id}
                {#each healthInfo.selling_products as product}
                    <button value={product} on:click={() => selectedProduct = product}>
                        {product}
                    </button>
                {/each}
            </div>
            <div class="flex flex-col gap-2">
                {#key selectedProduct}
                    <Temp farm_id={healthInfo._id} product_category={selectedProduct}/>
                {/key}
            </div>
            <div class="flex flex-row gap-4">
                <Chat receiverObjectID="All"/>
            </div>
        </div>
    {/if}
</main>