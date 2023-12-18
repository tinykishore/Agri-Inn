<script lang="ts">
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";
    import {onMount} from "svelte";
    import search_icon from "$lib/assets/icons/landing-page-search-icon.svg";
    import search_bg from "$lib/assets/images/search_bg.jpg";

    let searchKey:string = "";
    let filteredFarms: any;

    //export let data
	DynamicNavigation.set(DashboardNavigation);

	let farms: any;
	onMount(async () => {
		const response = await fetch('/API/v1/farms/GetFarmsAPI');
		farms = await response.json();
	});

    $: {
        if (searchKey === "") {
			filteredFarms = farms;
		} else {
			filteredFarms = farms.filter((farm: any) => {
				return farm.farm_name.toLowerCase().includes(searchKey.toLowerCase());
			});
		}
    }

</script>

<section class="fixed bg-fixed top-0 left-0 h-screen w-screen -z-50">
	<img alt="" class="w-full h-full bg-fixed object-cover" src="{search_bg}">
</section>


<main class="my-20 mx-32">
	<div class="flex justify-between gap-4 items-center align-middle">
		<div>
			<h1 class="text-4xl font-bold text-amber-950">Agri-Inn Farms</h1>
			<p class="text-xl font-bold text-yellow-class">Find the best farm products near you, or all over the country</p>
		</div>
		<div class="flex gap-2 justify-between items-center align-middle bg-white pl-4 rounded-xl border-amber-800 border-2 hover:shadow transition-all duration-300">
			<img src={search_icon} alt="" class="w-6 h-6 bg-white" />
			<input bind:value={searchKey} type="text"
				   class="h-fit px-4 py-2 border-amber-950 focus:ring-0 border-0 focus:border-0 focus:outline-none rounded-r-xl" placeholder="Type to Search Farms">
		</div>
	</div>
		{#if farms === undefined}
			<h1>
				Farm products loading
			</h1>
		{:else}
			<div class="grid grid-cols-3 gap-9 my-16">
				{#each filteredFarms as farm}
					<a href="/farms/{farm.uid}" class="group relative rounded-2xl h-72 hover:scale-105 transition-all duration-300">
						<img alt="" class="rounded-2xl object-cover w-full h-full" src={farm.img} />
						<div class="text-white rounded-2xl absolute top-0 left-0 w-full h-full flex flex-col justify-end p-6  bg-gradient-to-t from-black/70 to-black-100/10 group-hover:h-full group-hover:opacity-100">
							<h1 class="text-xl font-black bg-yellow-class rounded-md">{farm.farm_name}</h1>
							<h1 class="text-xl font-bold bg-yellow-class rounded-md">{farm.owner_name}</h1>
							<p class="text-white ">{farm.address.street}, {farm.address.city}</p>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</main>
