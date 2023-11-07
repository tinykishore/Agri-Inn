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
	<PaymentSection user_id={data._id} product_id={data.product_id} farm_id={data.farm_id} total_price={total_price}/>
{/if}

<main class="min-h-screen container mx-auto p-4 my-24 px-20 gap-4">
	<div id="main-section" class="bg-blue-300 rounded-2xl p-4 ">
		{#if product_information === undefined}
			<p>Loading...</p>
		{:else}
			<h1>{product_information.id}</h1>
			<h1>Will Show the product info</h1>
		{/if}
	</div>
</main>
