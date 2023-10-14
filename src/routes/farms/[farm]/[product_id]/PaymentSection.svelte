<script lang="ts">

    export let price: any;
    export let installments: any;

    // price is string, convert it to int, price stored in product_info.price


    const installmentThreshold = 1000;

    const onchange = (event: any) => {
        selectedOption = event.currentTarget.value;
    }

    let selectedOption = "";
    let reducedPrice = price;
    let isInstallment = false;

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

    const onInstallmentClick = async () => {
        if (!isInstallment) {
            reducedPrice = price / installments;
            isInstallment = true;
        } else {
            reducedPrice = price;
            isInstallment = false;
        }
    }

</script>

<div>
	<h1 class="font-bold text-3xl pb-6 text-gray-700 text-center">Payment Method</h1>
	<h1>{reducedPrice}</h1>
	<ul class="flex flex-col w-full gap-6">
		<li>
			<input checked={selectedOption === "card"} class="hidden peer" id="card" name="payment"
				   on:change={onchange} required type="radio"
				   value="card">
			<label class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
				   for="card">
				<div class="block">
					<div class="w-full">Card Payment</div>
				</div>
				<svg aria-hidden="true" class="w-5 h-5 ml-3" fill="none" viewBox="0 0 14 10"
					 xmlns="http://www.w3.org/2000/svg">
					<path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
						  stroke-width="2"/>
				</svg>
			</label>
		</li>
		<li>
			<input checked={selectedOption === "bkash"} class="hidden peer" id="bkash" name="payment"
				   on:change={onchange} type="radio" value="bkash">
			<label class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
				   for="bkash">
				<div class="block">
					<div class="w-full">Bkash</div>
				</div>
				<svg aria-hidden="true" class="w-5 h-5 ml-3" fill="none" viewBox="0 0 14 10"
					 xmlns="http://www.w3.org/2000/svg">
					<path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
						  stroke-width="2"/>
				</svg>
			</label>
		</li>

		<li>
			<input checked={selectedOption === "cod"} class="hidden peer" id="cod" name="payment" on:change={onchange}
				   required type="radio"
				   value="cod">
			<label class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
				   for="cod">
				<div class="block">
					<div class="w-full">Cash on Delivery (COD)</div>
				</div>
				<svg aria-hidden="true" class="w-5 h-5 ml-3" fill="none" viewBox="0 0 14 10"
					 xmlns="http://www.w3.org/2000/svg">
					<path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
						  stroke-width="2"/>
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

			{#if price > installmentThreshold}
				<button on:click={onInstallmentClick}
						class="mt-6 ml-8 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl focus:outline-none transition duration-300">
					Get Installment
				</button>
			{:else}
				<button disabled class="mt-6 ml-8 bg-zinc-400  text-white font-semibold px-4 py-2 rounded-xl">
					Get Installment
				</button>
			{/if}
		</div>

	{/if}

	{#if selectedOption === 'bkash'}
		<div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
			<div class="mt-4">
				<label for="trxId" class="block text-gray-600 font-semibold mb-1">Transaction ID</label>
				<input type="text" id="trxId" bind:value={bkashInfo.trxId}
					   class="border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"/>
			</div>

			{#if price > installmentThreshold}
				<button class="mt-6 ml-8 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl focus:outline-none transition duration-300">
					Get Installment
				</button>
			{:else}
				<button disabled class="mt-6 ml-8 bg-zinc-400  text-white font-semibold px-4 py-2 rounded-xl">
					Get Installment
				</button>
			{/if}
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

			{#if price > installmentThreshold}
				<button class="mt-6 ml-8 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl focus:outline-none transition duration-300">
					Get Installment
				</button>
			{:else}
				<button disabled class="mt-6 ml-8 bg-zinc-400  text-white font-semibold px-4 py-2 rounded-xl">
					Get Installment
				</button>
			{/if}

		</div>

	{/if}

</div>