<script lang="ts">
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";
    import {onMount} from "svelte";

    //export let data
    DynamicNavigation.set(DashboardNavigation);

    let healthInfo: any;
    onMount(async () => {
        const response = await fetch('/API/v1/getHealthTrackAPI');
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
                                {#each healthInfo as info}
                                    {#each info.animals as animal}
                                        <h1 class="text-2xl font-bold">{animal}</h1>
                                    {/each}
                                {/each}
                            </div>
                            <div class="flex flex-col gap-2">
                                {#each healthInfo as info}
                                    <h1>------Vaccine List-------</h1>
                                    {#each info.vaccine_list as vaccine}
                                        <h1 class="text-2xl font-bold">{vaccine}</h1>
                                    {/each}
                                    <h1>-------Disease list--------</h1>
                                    {#each info.disease_list as disease}
                                        <h1 class="text-2xl font-bold">{disease}</h1>
                                    {/each}
                                {/each}
                            </div>
                    <div class="flex flex-row gap-4">
                        {#each healthInfo as info}
                            {#each info.vet_list as vet}
                                <h1 class="text-2xl font-bold">{vet}</h1>
                            {/each}
                        {/each}
                    </div>
        </div>
    {/if}
</main>