<script lang="ts">
	import DynamicNavigation from "$lib/stores/DynamicNavigation";
	import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";
	import {onMount} from "svelte";

	//export let data
	DynamicNavigation.set(DashboardNavigation);

	let farms: any;
	onMount(async () => {
		const response = await fetch('/API/v1/farms/GetFarmsAPI');
		farms = await response.json();
	});

</script>
<main class="my-20 mx-32">
<!--	<main class="my-24 px-4">-->
		<!-- Welcome Box -->
		<div class="bg-gradient-to-bl from-amber-50 via-yellow-100 to-amber-100 w-full rounded-2xl p-6 flex items-center justify-center">
			<h1 class="text-4xl font-bold">Visit Any E-Farm Around The Country</h1>
		</div>

		{#if farms === undefined}
			<h1>
				Farm products loading
			</h1>
		{:else}
			<div class="grid grid-cols-3 gap-9 my-16">
				{#each farms as farm}
					<a href="/farms/{farm.uid}" class="group relative rounded-2xl h-72 hover:scale-105 transition-all duration-300">
						<img alt="" class="rounded-2xl object-cover w-full h-full" src={farm.img} />
						<div class="text-white rounded-2xl absolute top-0 left-0 w-full h-full flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-black-100/10 group-hover:h-full group-hover:opacity-100">
							<h1 class="text-xl font-black bg-yellow-class p-2 rounded-md">{farm.farm_name}</h1>
							<h1 class="text-xl font-bold bg-yellow-class p-2 rounded-md">{farm.owner_name}</h1>
							<p class="text-white mt-2 ml-3">{farm.address.street}, {farm.address.city}</p>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</main>
