<script lang="ts">
    import {onMount} from "svelte";
    import PaymentSection from "./PaymentSection.svelte";
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";

    export let data;
    DynamicNavigation.set(DashboardNavigation);
    const product_id = data.product_id;

    let product_info: any;
    let price: number;
    let installments: number;

    let showPayment = false;

    const showPaymentSection = () => {
        showPayment = !showPayment;
    }

    onMount(async () => {
        // Call api to get product data
        const productResponse = await fetch('/API/v1/farms/GetProductInfoAPI', {
            method: 'POST',
            body: JSON.stringify(product_id),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const farmResponse = await fetch('/API/v1/farms/GetOneFarmAPI', {
            method: 'POST',
            body: JSON.stringify(data.farm_id),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const farm_info = await farmResponse.json();
        installments = farm_info.installments;

        product_info = await productResponse.json();
        let dollarAmount = product_info.price;
        price = parseFloat(dollarAmount.replace(/[$,]/g, ''));


	});


</script>


<main class="min-h-screen container mx-auto p-4 my-24 px-20 grid grid-cols-3 gap-4 ">
	<div id="main-section" class="col-span-2 bg-blue-300 rounded-2xl p-4 ">
		{#if product_info === undefined}
			<p>Loading...</p>
		{:else}
			<h1>{product_info.id}</h1>
			<p>{product_info.health_status}</p>
			<p>{price}</p>
			<h1 class="text-4xl">Payment --------</h1>
			<button on:click={showPaymentSection}>Buy Now</button>
		{/if}
	</div>
	{#if showPayment}
	<div id="payment-section" class="bg-amber-100 h-fit rounded-2xl flex flex-col gap-4 p-4">
		<div class="flex justify-between">
			<h1>Payment method</h1>
			<button on:click={() => {
			const mainSection = document.getElementById('main-section');
			const paymentSection = document.getElementById('payment-section');
			mainSection?.classList.remove('col-span-2');
			mainSection?.classList.add('col-span-3');
			paymentSection?.classList.add('hidden');
		}}>Close
			</button>
		</div>


		<PaymentSection price={price} installments={installments}/>

	</div>
	{/if}
</main>
