<script lang="ts">
    import card_icon from "$lib/assets/icons/farms_farm_product_id_modal_card_icon.svg";
    import bkash_icon from "$lib/assets/icons/farms_farm_product_id_modal_bkash_icon.svg";
    import cod_icon from "$lib/assets/icons/farms_farm_product_id_modal_cod_icon.svg";
    import Payment from "$lib/stores/Payment";

    let payment = {
        method: 0,
        card_number: "",
        card_holder: "",
        card_expiration: "",
        card_cvv: "",
        bkash_number: "",
    }



    const onPaymentChange = (event: any) => {
        payment.method = parseInt(event.currentTarget.value);
    }

    $: {
        Payment.update((values) => {
            return {
                ...values,
                payment
            }
        })
    }
</script>


	<div class="px-6 py-4 flex-col flex gap-4 border-r-2 border-amber-950/40">
		<div>
			<h1 class="text-center text-xl font-bold text-amber-700 mb-6">
				Payment Method
			</h1>
			<div class="flex-col flex gap-1">
				<ul class="grid grid-cols-3 gap-1 py-4">
					<li>
						<input checked={payment.method === 0} class="hidden peer" id="card"
							   name="payment"
							   on:change={onPaymentChange} required type="radio"
							   value=0>
						<label class="flex text-sm text-amber-900 font-bold flex-col items-center justify-between
							py-2 w-full border border-amber-300 rounded-lg cursor-pointer peer-checked:border-amber-600
							peer-checked:text-amber-600 hover:text-amber-600 hover:bg-amber-200 transition-all duration-300"
							   for="card">
								<span>
									<img class="w-6 h-6 mb-2" src={card_icon} alt=""/>
								</span>
							Card
						</label>
					</li>
					<li>
						<input checked={payment.method === 1} class="hidden peer" id="bkash"
							   name="payment"
							   on:change={onPaymentChange} type="radio" value=1>
						<label class="flex text-sm text-amber-900 font-bold flex-col items-center justify-between
							py-2 w-full border border-amber-300 rounded-lg cursor-pointer peer-checked:border-amber-600
							peer-checked:text-amber-600 hover:text-amber-600 hover:bg-amber-200 transition-all duration-300"
							   for="bkash">
								<span>
									<img class="w-6 h-6 mb-2" src={bkash_icon} alt=""/>
								</span>
							BKash
						</label>
					</li>
					<li>
						<input checked={payment.method === 2} class="hidden peer" id="cod"
							   name="payment"
							   on:change={onPaymentChange}
							   required type="radio"
							   value=2>
						<label class="flex text-sm text-amber-900 font-bold flex-col items-center justify-between
							py-2 w-full border border-amber-300 rounded-lg cursor-pointer peer-checked:border-amber-600
							peer-checked:text-amber-600 hover:text-amber-600 hover:bg-amber-200 transition-all duration-300"
							   for="cod">
								<span>
									<img class="w-6 h-6 mb-2" src={cod_icon} alt=""/>
								</span>
							COD
						</label>
					</li>
				</ul>
			</div>

			{#if payment.method === 0}
				<label class="block font-bold text-gray-600 mt-5" for="address">Your Card Information</label>
				<label class="block font-light text-xs text-gray-600 mb-4" for="address">
					We do not store this information
				</label>

				<input required bind:value={payment.card_number}
					   type="text"
					   placeholder="Card Number"
					   class="font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none
                       focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>

				<input required bind:value={payment.card_holder}
					   type="text"
					   placeholder="Card Name"
					   class="font-mono mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none
                       focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>

				<div class="flex gap-2  mt-2">
					<div>
						<input required bind:value={payment.card_cvv}
							   placeholder="CVV"
							   type="text"
							   class="font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>
					</div>

					<div>
						<input required bind:value={payment.card_expiration}
							   placeholder="Expiry"
							   type="text"
							   class="font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>
					</div>
				</div>

			{/if}

			{#if payment.method === 1}
				<label class="block font-bold text-gray-600 mt-5" for="address">Your BKash Information</label>
				<label class="block font-light text-xs text-gray-600 mb-4" for="address">
					We do not store this information
				</label>

				<input required bind:value={payment.bkash_number}
					   type="text"
					   placeholder="BKash Agent Number"
					   class="font-mono bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-full outline-none
                       focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>

				<h1 class="block font-bold text-xs text-gray-600 mb-4">
					We will email you our Agent number Blah blah some things
				</h1>

			{/if}

			{#if payment.method === 2}
				<label class="block font-bold text-gray-600 mt-5" for="address">Cash On Delivery (COD)</label>
				<label class="block font-light text-xs text-gray-600 mb-4" for="address">
					Installment option is not available for COD
				</label>

				<h1 class="block font-bold text-xs text-gray-600 mb-4">
					Some talk, product will reach
				</h1>
			{/if}


		</div>

	</div>
