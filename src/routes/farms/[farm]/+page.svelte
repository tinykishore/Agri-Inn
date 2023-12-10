<script lang="ts">
	import {onMount} from "svelte";
	import DynamicNavigation from "$lib/stores/DynamicNavigation";
	import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";
	import UserCache from "$lib/stores/UserCache";

	export let data
	DynamicNavigation.set(DashboardNavigation);


	const farm_uid = data.farm_uid;

	let farm_info: any;
	let farm_products: any;

	let userCache: TypeUserCache;
	let isOwner = false;

	UserCache.subscribe(value => {
		userCache = value;
	})

	let newProduct = {
		breed: "",
		price: "",
		age: "",
		weight: "",
		color: ""
	}


	onMount(async () => {
		// Call API to get farm info
		const farm_info_response = await fetch('/API/v1/farms/GetOneFarmAPI', {
			method: 'POST',
			body: JSON.stringify(farm_uid),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		farm_info = await farm_info_response.json();

		if(userCache._id === farm_info.owner_id){
			isOwner = true;
		}

		// Call API to get farm products
		const farm_products_response = await fetch('/API/v1/farms/GetOneFarmProductsAPI', {
			method: 'POST',
			body: JSON.stringify(farm_uid),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		farm_products = await farm_products_response.json();
		const installments = farm_products["installments"]
		console.log(installments)

	})

	const addProduct = () => {
		fetch('/API/v1/farms/AddProductAPI', {
			method: 'POST',
			body: JSON.stringify({
				farm_uid: farm_uid,
				product: newProduct
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}



</script>

<main class="my-20 mx-32">
	{#if farm_info === undefined}
		<h1>
			Farm info loading
		</h1>
	{:else}
		<div class="bg-gradient-to-bl from-amber-50 via-yellow-100 to-amber-100 w-full rounded-2xl p-6">
			<p class="text-4xl">{farm_info.farm_name}</p>
			<p>{farm_info.description}</p>
			<p>{farm_info.owner_name}</p>
			{#if isOwner}
				<input type="text" placeholder="Breed" bind:value={newProduct.breed}> <br>
				<input type="text" placeholder="Price" bind:value={newProduct.price}> <br>
				<input type="text" placeholder="Age" bind:value={newProduct.age}> <br>
				<input type="text" placeholder="Weight" bind:value={newProduct.weight}> <br>
				<input type="text" placeholder="Color" bind:value={newProduct.color}> <br>

				<button on:click={addProduct}>Add Product</button>
			{/if}
		</div>
	{/if}

	{#if farm_products === undefined}
		<h1>
			Farm products loading
		</h1>
	{:else}

		<div class="grid grid-cols-3 gap-9 my-16 ">
			{#each farm_products["products"] as product}
				<a href="/farms/{farm_info.uid}/{product.id}"
				   class="group rounded-2xl h-72 hover:scale-105 transition-all duration-300">
					<img alt="" class="rounded-2xl object-cover w-full h-full" src={product.img}/>
					<div class="text-white rounded-2xl absolute top-0 left-0 w-full h-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-black-100/10 opacity-0 group-hover:h-full group-hover:opacity-100">
						<h1 class="text-xl font-black">{product.breed}</h1>
						<h1 class="text-xl font-bold">{product.price}</h1>
					</div>
				</a>
			{/each}
		</div>
	{/if}


</main>
