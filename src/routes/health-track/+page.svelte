<script lang="ts">
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";
    import {onMount} from "svelte";
    import Temp from "./Temp.svelte";

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


<style>
    .card-wrapper {
        background-color: #FFC107;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 16px;
    }

    .section-content {
    }
</style>

<main class="my-24 flex justify-center items-center">
    {#if healthInfo === undefined}
        <div class="flex flex-col my-12 mx-4 gap-8">
            <h1>Loading...</h1>
        </div>
    {:else}
        <div class="card-wrapper">
            <div class="grid grid-cols-3 gap-6 max-w-5xl">
                <div class="flex flex-col gap-3 rounded-2xl w-full p-3 transition-all duration-300 items-center justify-start align-middle col-span-1">
                    <div class="section-content scrollable-section" style="max-height: 400px; overflow-y: auto;">
                        <h2 class="text-lg font-bold mb-2">Animals in My Farm</h2>
                        {#each healthInfo.selling_products as product}
                            <div class="flex gap-4 rounded-2xl w-full p-3 hover:bg-amber-200 hover:drop-shadow-sm">
                                <button on:click={() => selectedProduct = product} class="text-lg font-bold">{product}</button>
                            </div>
                        {/each}
                    </div>
                </div>
                {#if selectedProduct !== ''}
                    <div class="flex flex-col gap-2 col-span-1 w-full">
                        <div class="section-content scrollable-section" style="max-height: 400px; overflow-y: auto;">
                            <h2 class="text-lg font-bold mb-2">Animals' Health Record</h2>
                            <Temp farm_id={healthInfo._id} product_category={selectedProduct}/>
                        </div>
                    </div>
                {/if}
                <div class="flex flex-col gap-4 col-span-1">
                    <div class="section-content text-lg font-bold mb-2">Vets Suggestions for Your Animals</div>
                    <div class="section-content scrollable-section" style="max-height: 400px; overflow-y: auto;">
                        {#if vetsinfo}
                            {#each vetsinfo as vet}
                                <div class="flex gap-4 rounded-2xl w-full p-3 hover:bg-amber-200 hover:drop-shadow-sm transition-all duration-300 items-center justify-start align-middle">
                                    <img alt="" class="w-12 h-12 rounded-full" src={vet.profile_picture}/>
                                    <div class="flex-col flex w-full justify-start align-middle items-start">
                                        <div class="flex-col flex w-full justify-start align-middle items-start">
                                            <div class="text-lg font-bold">{vet.full_name}</div>
                                            <div class="text-sm font-medium text-zinc-500">{vet.username} &bull; {vet.phone}</div>
                                            <div class="flex-col flex w-full justify-start align-middle items-start">
                                                <button class="bg-zinc-400 mt-1.5 text-white w-fit font-bold py-1 px-2.5 rounded-full">
                                                    View Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    {/if}
</main>







