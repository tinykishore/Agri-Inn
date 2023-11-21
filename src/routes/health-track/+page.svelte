<script lang="ts">
    import {onMount} from "svelte";
    import Temp from "./Temp.svelte";
    import forum_id_bg from "$lib/assets/images/forum_id_bg.jpg";
    import {makeFirstLetterCapital} from "$lib/client/utility";

    //export let data
    // DynamicNavigation.set(DashboardNavigation);

    export let data;

    let selectedProduct = '';

    let healthInfo: any;
    let allVetsData: any;
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


        const allVetsResponse = await fetch('/API/v1/GetAllVetAPI')
        allVetsData = await allVetsResponse.json();
    });

</script>

<section class="fixed bg-fixed top-0 left-0 h-screen w-screen -z-50">
    <img alt="sign-in-bg" class="w-full h-full bg-fixed object-cover" src="{forum_id_bg}">
</section>

<main class="my-20 mx-32">
    {#if healthInfo === undefined}
        <div class="flex flex-col my-12 mx-4 gap-8">
            <h1>Loading...</h1>
        </div>
    {:else}
        <div class="grid grid-cols-3">
            <div class="flex bg-amber-200/70 flex-col gap-3 rounded-l-2xl w-full transition-all
                duration-300 justify-start align-middle pl-8 py-6">
                <h1 class="text-2xl font-bold mb-2 text-amber-800">Animals in My Farm</h1>
                <div class="overflow-y-scroll flex flex-col gap-2">
                        {#each healthInfo.selling_products as product}
                            <button on:click={() => selectedProduct = product} class="rounded-l-2xl w-full p-3 hover:bg-amber-500 hover:text-white
                            hover:shadow-lg transition-all duration-300 text-lg font-bold text-start">
                                {makeFirstLetterCapital(product)}
                            </button>
                        {/each}
                    </div>
                </div>

            <div class="flex flex-col gap-2 w-full bg-amber-500 rounded-r-2xl">
                {#if selectedProduct !== ''}
                    <div class="p-8 py-6">
                        <h2 class="text-2xl text-amber-950 font-bold mb-4">Animals' Health Record</h2>
                        <div class="h-[30rem] overflow-y-scroll rounded-2xl">
                            <Temp farm_id={healthInfo._id} product_category={selectedProduct}/>
                        </div>
                    </div>
                {:else}
                    <div class="bg-amber-100 w-full h-full flex-col flex items-center align-middle justify-center rounded-r-2xl">
                        <h1 class="text-3xl text-zinc-500/50">Select an Animal</h1>
                    </div>
                {/if}
            </div>
            <div class="flex flex-col gap-4 col-span-1">
                    <div class="section-content text-lg font-bold mb-2">Vets Suggestions for Your Animals</div>
                    <div class="section-content scrollable-section" style="max-height: 400px; overflow-y: auto;">
                        {#if allVetsData}
                            {#each allVetsData as vet}
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
    {/if}
</main>







