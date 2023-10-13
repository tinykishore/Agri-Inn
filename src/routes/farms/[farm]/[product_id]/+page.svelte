<script lang="ts">
    import {onMount} from "svelte";

    export let data;
    const product_id = data.product_id;

    let product_info: any;
    onMount(async () => {
        // Call api to get product data
        const response = await fetch('/API/v1/farms/GetProductInfoAPI', {
            method: 'POST',
            body: JSON.stringify(product_id),
            headers: {
                'Content-Type': 'application/json'
            }
        });
		product_info = await response.json();
	});
	const showPaymentSection = () => {
		const mainSection = document.getElementById('main-section');
		const paymentSection = document.getElementById('payment-section');
		mainSection?.classList.remove('col-span-3');
		mainSection?.classList.add('col-span-2');
		paymentSection?.classList.remove('hidden');
	}

	const onchange = (event: any) => {
		selectedOption = event.currentTarget.value;
	}

	let selectedOption = "";

	const options = [
		{value: "card", label: "Card"},
		{value: "bkash", label: "BKash"},
		{value: "cod", label: "Cash on Delivery"}
	];

	let cardInfo = {
		cardNumber: "",
		cardName: "",
		cardExpiry: "",
		cardCvv: ""
	};
	let bkashInfo = {trxId: ""};

</script>


<main class="min-h-screen container mx-auto p-4 my-24 px-20 grid grid-cols-3 gap-4 ">
	<div id="main-section" class="col-span-3 bg-blue-300 rounded-2xl p-4 ">
		{#if product_info === undefined}
			<p>Loading...</p>
		{:else}
			<h1>{product_info.id}</h1>
			<p>{product_info.health_status}</p>
			<h1 class="text-4xl">Payment --------</h1>
			<button on:click={showPaymentSection}>Buy Now</button>
		{/if}
	</div>

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

		<div>
			<h1 class="font-bold text-3xl pb-6 text-gray-700 text-center">Payment Method</h1>
			<ul class="flex flex-col w-full gap-6">
				<li>
					<input checked={selectedOption === "card"} on:change={onchange} name="payment" type="radio"
						   id="card" class="hidden peer" value="card"
						   required>
					<label for="card"
						   class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
						<div class="block">
							<div class="w-full">Card Payment</div>
						</div>
						<svg class="w-5 h-5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
							 viewBox="0 0 14 10">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								  d="M1 5h12m0 0L9 1m4 4L9 9"/>
						</svg>
					</label>
				</li>
				<li>
					<input checked={selectedOption === "bkash"} on:change={onchange} type="radio" id="bkash"
						   name="payment" value="bkash" class="hidden peer">
					<label for="bkash"
						   class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
						<div class="block">
							<div class="w-full">Bkash</div>
						</div>
						<svg class="w-5 h-5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
							 viewBox="0 0 14 10">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								  d="M1 5h12m0 0L9 1m4 4L9 9"/>
						</svg>
					</label>
				</li>

				<li>
					<input checked={selectedOption === "cod"} on:change={onchange} type="radio" id="cod" name="payment"
						   value="cod" class="hidden peer"
						   required>
					<label for="cod"
						   class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
						<div class="block">
							<div class="w-full">Cash on Delivery (COD)</div>
						</div>
						<svg class="w-5 h-5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
							 viewBox="0 0 14 10">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								  d="M1 5h12m0 0L9 1m4 4L9 9"/>
						</svg>
					</label>
				</li>
			</ul>

			{#if selectedOption === 'card'}
				<div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
					<div class="flex flex-col gap-4">
						<div class="flex flex-col gap-1">
							<label for="cardNumber" class="text-gray-600 font-semibold">Card Number</label>
							<input class="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
								   type="text" id="cardNumber" bind:value={cardInfo.cardNumber}
								   placeholder="**** **** **** ****"/>
						</div>

						<div class="flex flex-col gap-1">
							<label for="cardName" class="text-gray-600 font-semibold">Card Name</label>
							<input class="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
								   type="text" id="cardName" bind:value={cardInfo.cardName} placeholder="John Doe"/>
						</div>

						<div class="flex gap-1">
							<div class="flex flex-col w-1/2 gap-1">
								<label for="cardExpiry" class="text-gray-600 font-semibold">Card Expiry</label>
								<input class="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
									   type="text" id="cardExpiry" bind:value={cardInfo.cardExpiry}
									   placeholder="MM/YY"/>
							</div>

							<div class="flex flex-col w-1/2 gap-1">
								<label for="cardCvv" class="text-gray-600 font-semibold">Card CVV</label>
								<input class="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
									   type="text" id="cardCvv" bind:value={cardInfo.cardCvv} placeholder="CVV"/>
							</div>
						</div>
					</div>

					<button class="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl focus:outline-none transition duration-300">
						Confirm Order
					</button>

					<button class="mt-6 ml-8 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl focus:outline-none transition duration-300">
						Get Installment
					</button>
				</div>

			{/if}

			{#if selectedOption === 'bkash'}
				<div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
					<div class="mt-4">
						<label for="trxId" class="block text-gray-600 font-semibold mb-1">Transaction ID</label>
						<input type="text" id="trxId" bind:value={bkashInfo.trxId}
							   class="border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"/>
					</div>

					<button class="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl focus:outline-none transition duration-300"
					>
						Confirm Order
					</button>
					<button class="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl focus:outline-none transition duration-300">
						Get Installment
					</button>
				</div>

			{/if}

			{#if selectedOption === 'cod'}
				<div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
					<div class="mt-4">
						<label for="address" class="block text-gray-600 font-semibold mb-1">Delivery Address</label>
						<input type="text" id="address"
							   class="border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"/>
					</div>

					<div class="mt-4">
						<label for="phoneNumber" class="block text-gray-600 font-semibold mb-1">Phone Number</label>
						<input type="tel" id="phoneNumber"
							   class="border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"/>
					</div>

					<button class="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl focus:outline-none transition duration-300">
						Confirm Order
					</button>

					<button class="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl focus:outline-none transition duration-300">
						Get Installment
					</button>

				</div>

			{/if}

		</div>

	</div>


</main>
