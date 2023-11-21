<script lang="ts">
    import Payment from "$lib/stores/Payment";

    export let public_profile: any;

    let shipping_address: Address = {
		street: '',
		state: '',
		city: '',
		zip: '',
		country: ''
	}

    $: {
        Payment.update((values) => {
			return {
				...values,
				shipping_address
			}
		})
	}

</script>

{#if public_profile}
	<div class="py-4 px-6 flex-col flex gap-1 border-r-2 border-amber-950/40">
		<div>
			<h1 class="text-center text-xl font-bold text-amber-700 mb-6">
				Personal Information</h1>

			<div class="mb-2">
				<label class="block font-bold text-gray-600" for="full_name">Full Name</label>
				<h1 class="font-bold text-amber-900">{public_profile.full_name} </h1>
			</div>

			<div class="mb-2">
				<label class="block font-bold text-gray-600" for="phone_number">Phone Number</label>
				<h1 class="font-bold text-amber-900">{public_profile.phone} </h1>
			</div>
		</div>
		<div class="mb-1">
			<label class="block font-bold text-gray-600 mt-1.5" for="address">Address</label>
			<label class="block font-light text-xs text-gray-600 mb-4" for="address">Product will be shipped
				in this Address</label>

			<input required
				   bind:value={shipping_address.street}
				   type="text"
				   placeholder="Street Address"
				   class="mt-1 mb-1 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none
                       focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>

			<div class="flex gap-2">
				<div>
					<input required
						   bind:value={shipping_address.state}
						   placeholder="State"
						   type="text"
						   class="mt-2 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>
				</div>

				<div>
					<input required
						   bind:value={shipping_address.city}
						   placeholder="City"
						   type="text"
						   class="mt-2 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>

				</div>
			</div>

			<div class="flex gap-2">
				<div>
					<input required
						   bind:value={shipping_address.zip}
						   placeholder="Zip Code"
						   type="text"
						   class="mt-2 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>
				</div>

				<div>
					<input required
						   bind:value={shipping_address.country}
						   placeholder="Country"
						   type="text"
						   class="mt-2 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>
				</div>
			</div>
		</div>
	</div>

{:else}
	<div class="w-full h-full grid grid-cols-1  border-r-2 border-amber-950/40">
		<svg class="animate-spin h-[2.35rem] w-[2.35rem] place-self-center text-yellow-800"
			 xmlns="http://www.w3.org/2000/svg"
			 fill="none"
			 viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
					stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor"
				  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
			</path>
		</svg>
	</div>
{/if}
