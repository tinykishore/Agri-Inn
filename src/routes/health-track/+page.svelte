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
    let vetsinfo: any;
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
        const abcd = await fetch('/API/v1/GetAllVetAPI')
        vetsinfo = await abcd.json();
        console.log(vetsinfo)
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
                {#if vetsinfo }

                {#each vetsinfo as vet}
                    <div class="flex gap-4 rounded-2xl w-full p-3 hover:bg-amber-200 hover:drop-shadow-sm transition-all duration-300 items-center justify-start align-middle">
                        <img alt="" class="w-12 h-12 rounded-full" src={vet.profile_picture}/>
                        <div class="flex-col flex w-full justify-start align-middle items-start">
                            <div class="flex-col flex w-full justify-start align-middle items-start">
                                <div class="text-lg font-bold">{vet.full_name}</div>
                                <div class="text-sm font-medium text-zinc-500">{vet.username}
                                    &bull; {vet.phone}</div>
                            </div>
                        </div>
                    </div>
                {/each}
                    {/if}
            </div>
        </div>
    {/if}
</main>