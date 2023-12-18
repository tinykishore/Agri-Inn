<script lang="ts">
    import {onMount} from "svelte";
    import DynamicNavigation, {farm_productID_navigation} from "$lib/stores/DynamicNavigation";
    import Farm_Product_ID_Navigation from "$lib/components/dynamicNavigations/farm/Farm_Product_ID_Navigation.svelte";
    import {modals} from "$lib/stores/Modals";
    import DefaultNavigation from "$lib/components/dynamicNavigations/DefaultNavigation.svelte";
    import PaymentSection from "./PaymentSection.svelte";

    export let data;
    DynamicNavigation.set(DefaultNavigation);

    // Variable to store product information
    let product_information: any;
	let total_price: number;

    // Variable to check if payment section is visible
    let isPaymentSectionVisible: boolean = false;

    // Subscribe to modals store to show the modal
    modals.subscribe((value) => {
        isPaymentSectionVisible = value.farms_farm_product_modal;
    });

    onMount(async () => {
        // Call API to get product information
        const GetProductInfoAPIResponse = await fetch('/API/v1/farms/GetProductInfoAPI', {
            method: 'POST',
            body: JSON.stringify(data.product_id),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Get product information from API response
        product_information = await GetProductInfoAPIResponse.json();

        // Remove $ and , from price because price stored in database is a string
        let price: any = product_information.price;
        price = parseFloat(price.replace(/[$,]/g, ''));
		total_price = price;


        // Call API to get farm information
        const GetOneFarmAPIResponse = await fetch('/API/v1/farms/GetOneFarmAPI', {
            method: 'POST',
            body: JSON.stringify(data.farm_id),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Get farm information from API response
        const farm_information = await GetOneFarmAPIResponse.json();

        // Set navigation store for farm_productID_navigation
        farm_productID_navigation.set({
			productID: data.product_id,
			farm_name: farm_information.farm_name,
			product_price: price,
            availability: product_information.availability,
		});

        // Set Dynamic Navbar
        DynamicNavigation.set(Farm_Product_ID_Navigation);
	});


</script>

{#if isPaymentSectionVisible}
	<PaymentSection user_id={data._id} product_id={data.product_id} farm_id={data.farm_id} total_price={total_price} product_breed={product_information.breed}/>
{/if}

<main class="min-h-screen container mx-auto p-4 my-24 px-20 gap-4">
	<div id="main-section" class="bg-gradient-to-bl from-amber-50 via-yellow-100 to-amber-100 rounded-2xl p-8 shadow-lg">
		{#if product_information === undefined}
			<div class="text-center animate__animated animate__flash">
				<p class="text-xl font-semibold text-gray-600">
					Loading...
				</p>
			</div>
		{:else}
			<h1 class="text-4xl font-extrabold text-gray-800 mb-4">{product_information.id}</h1>
			<h2 class="text-2xl font-semibold text-gray-700 mb-8">Product Information</h2>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div class="mb-4">
					<p class="text-lg font-bold text-yellow-500">Category:</p>
					<p class="text-gray-700">{product_information.category}</p>
				</div>

				<div class="mb-4">
					<p class="text-lg font-bold text-yellow-500">Breed:</p>
					<p class="text-gray-700">{product_information.breed}</p>
				</div>

				<div class="mb-4">
					<p class="text-lg font-bold text-yellow-500">Age:</p>
					<p class="text-gray-700">{product_information.age}</p>
				</div>

				<div class="mb-4">
					<p class="text-lg font-bold text-yellow-500">Gender:</p>
					<p class="text-gray-700">{product_information.gender}</p>
				</div>

				<div class="mb-4">
					<p class="text-lg font-bold text-yellow-500">Weight:</p>
					<p class="text-gray-700">{product_information.weight}</p>
				</div>

				<div class="mb-4">
					<p class="text-lg font-bold text-yellow-500">Health Status:</p>
					<p class="text-gray-700">{product_information.health_status}</p>
				</div>

				<div class="mb-4">
					<p class="text-lg font-bold text-yellow-500">Temperament:</p>
					<p class="text-gray-700">{product_information.temperament}</p>
				</div>

				<div class="mb-4">
					<p class="text-lg font-bold text-yellow-500">Diet:</p>
					<p class="text-gray-700">{product_information.diet}</p>
				</div>
			</div>
		{/if}
	</div>
</main>

