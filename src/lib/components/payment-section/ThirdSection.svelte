<script lang="ts">
    import card_icon from "$lib/assets/icons/farms_farm_product_id_modal_card_icon.svg";
    import Payment from "$lib/stores/Payment";

    let installment: number;

    let payment_method: any;
    let total_price: number;
    const threshold = 500;

    Payment.subscribe((values) => {
        total_price = values.total_price;
        payment_method = values.payment.method;
    });

    const onInstallmentChange = (event: any) => {
        installment = parseInt(event.target.value);
    };

    $: {
        Payment.update((values) => {
            return {
                ...values,
                installment
            }
        })
    }

</script>

{#if payment_method === 2 || total_price < threshold}
	<div class="px-6 py-4 flex-col flex gap-4 border-r-2 border-amber-950/40">
		<h1 class="text-center text-xl font-bold text-amber-700 mb-6">
			Installment Settings</h1>
		<div class="grid grid-rows-1">
			{#if total_price < threshold}
				<h1>Installment option is unavailable</h1>
			{:else if payment_method === 2}
				<h1>Installment option is unavailable for this payment method</h1>
			{/if}
		</div>
	</div>
{:else}
	<div class="px-6 py-4 flex-col flex gap-4 border-r-2 border-amber-950/40">
		<h1 class="text-center text-xl font-bold text-amber-700 mb-4">
			Installment Settings</h1>

		<div class="mb-2">
			<label class="block font-bold text-gray-600" for="full_name">Full Name</label>
		</div>

		<ul class="grid grid-rows-3 gap-1 py-4 ">
			<li>
				<input checked={installment === 2} class="hidden peer" id="m2"
					   name="installment"
					   on:change={onInstallmentChange} required type="radio"
					   value=2>
				<label class="flex text-sm text-amber-900 font-bold flex-col items-center justify-between
							py-2 w-full border border-amber-300 rounded-lg cursor-pointer peer-checked:border-amber-600
							peer-checked:text-amber-600 hover:text-amber-600 hover:bg-amber-200 transition-all duration-300"
					   for="m2">
								<span>
									<img class="w-6 h-6 mb-2" src={card_icon} alt=""/>
								</span>
					2 Months
				</label>
			</li>
			<li>
				<input checked={installment === 4} class="hidden peer" id="m4"
					   name="installment"
					   on:change={onInstallmentChange} required type="radio"
					   value=4>
				<label class="flex text-sm text-amber-900 font-bold flex-col items-center justify-between
							py-2 w-full border border-amber-300 rounded-lg cursor-pointer peer-checked:border-amber-600
							peer-checked:text-amber-600 hover:text-amber-600 hover:bg-amber-200 transition-all duration-300"
					   for="m4">
								<span>
									<img class="w-6 h-6 mb-2" src={card_icon} alt=""/>
								</span>
					4 Months
				</label>
			</li>
			<li>
				<input checked={installment === 6} class="hidden peer" id="m6"
					   name="installment"
					   on:change={onInstallmentChange} required type="radio"
					   value=6>
				<label class="flex text-sm text-amber-900 font-bold flex-col items-center justify-between
							py-2 w-full border border-amber-300 rounded-lg cursor-pointer peer-checked:border-amber-600
							peer-checked:text-amber-600 hover:text-amber-600 hover:bg-amber-200 transition-all duration-300"
					   for="m6">
								<span>
									<img class="w-6 h-6 mb-2" src={card_icon} alt=""/>
								</span>
					6 Months
				</label>
			</li>
		</ul>
	</div>
{/if}
