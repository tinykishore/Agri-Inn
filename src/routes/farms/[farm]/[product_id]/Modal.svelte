<script lang="ts">
    import {modals} from "$lib/stores/Modals";
    import {fade, fly} from "svelte/transition";
    import close_icon from "$lib/assets/icons/farms_farm_product_id_modal_close_icon.svg";
    import card_icon from "$lib/assets/icons/farms_farm_product_id_modal_card_icon.svg";
    import bkash_icon from "$lib/assets/icons/farms_farm_product_id_modal_bkash_icon.svg";
    import cod_icon from "$lib/assets/icons/farms_farm_product_id_modal_cod_icon.svg";
    import {onMount} from "svelte";
    import UserCache from "$lib/stores/UserCache";

    // User variable
    let username: string | undefined;
    let userID: string | undefined;
    let userEmail: string | undefined;
    let public_profile: PublicProfile;

    // UI variable
    let PersonalInfoOpacity = "";
    let PaymentMethodOpacity = "";
    let InstallmentOpacity = "";
    let ConfirmationOpacity = "";
    let FIRST_SECTION_OK: boolean = false;

    // Payment Process Variable
    let address = {
        street: "",
        state: "",
        city: "",
        zip_code: "",
        country: "",
    }

    $: {
        FIRST_SECTION_OK = address.street !== "" && address.state !== "" && address.city !== "" && address.zip_code !== "" && address.country !== "";
    }

	const modalCloseAction = () => {
		modals.set({
			farms_farm_product_modal: false,
		})
	}




    onMount(async () => {

        UserCache.subscribe(value => {
            username = value.username;
            userID = value._id;
            userEmail = value.email
        })

        const response = await fetch('/API/v1/auth/GetPublicProfile', {
            method: 'POST',
            body: JSON.stringify({
                "username": username,
                "_id": userID,
                "email": userEmail,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        public_profile = await response.json();
    });

    const onFirstNextClick = () => {

    }









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

    let selectedOption = "";

    const onchange = (event: any) => {
        selectedOption = event.currentTarget.value;
    }


</script>

<section in:fade={{ duration: 200, delay: 200 }}
		 class="fixed bg-fixed grid grid-cols-1 top-0 left-0 h-screen w-screen z-[10000] bg-black/30 backdrop-blur-sm">
	<main in:fly={{ duration: 200, delay: 400 }} class=" h-[90%] flex flex-col w-[90%] place-self-center px-8  py-6 bg-gradient-to-bl
	from-white via-yellow-50 to-amber-100 rounded-2xl shadow-2xl background-animate">
		<div class="font-black text-3xl text-amber-900 flex justify-between mx-6 my-4">
			<h1>Payment Process</h1>
			<div class="flex gap-4 align-middle items-center">

				<h1 class="text-sm font-bold text-zinc-400">
					Closing this window erases all payment data
				</h1>

				<button on:click={modalCloseAction}>
						<span>
							<img class="w-8 h-8" src={close_icon} alt=""/>
						</span>
				</button>
			</div>
		</div>

		<div class="w-full h-full grid-cols-4 grid">
			{#if public_profile}
				<div class="py-2 px-6 flex-col flex gap-1 border-r-2 border-amber-950/40 {PersonalInfoOpacity}">
					<h1 class="text-center text-xl font-bold text-amber-700 mb-4">
						Personal Information</h1>

					<div class="mb-1">
						<label class="block font-bold text-gray-600 mb-1" for="full_name">Full Name</label>
						<h1 class="font-bold text-amber-900">{public_profile.full_name} </h1>
					</div>

					<div class="mb-1">
						<label class="block font-bold text-gray-600 mb-1" for="phone_number">Phone Number</label>
						<h1 class="font-bold text-amber-900">{public_profile.phone} </h1>
					</div>

					<hr class="mx-4">

					<div class="mb-1">
						<label class="block font-bold text-gray-600 mt-4" for="address">Address</label>
						<label class="block font-light text-xs text-gray-600 mb-4" for="address">Product will be shipped
							in this Address</label>

						<input required
							   bind:value={address.street}
							   type="text"
							   placeholder="Street Address"
							   class="mt-1 mb-1 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none
                       focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>

						<div class="flex gap-2">
							<div>
								<input required
									   bind:value={address.state}
									   placeholder="State"
									   type="text"
									   class="mt-2 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>
							</div>

							<div>
								<input required
									   bind:value={address.city}
									   placeholder="City"
									   type="text"
									   class="mt-2 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>

							</div>
						</div>

						<div class="flex gap-2">
							<div>
								<input required
									   bind:value={address.zip_code}
									   placeholder="Zip Code"
									   type="text"
									   class="mt-2 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>
							</div>

							<div>
								<input required
									   bind:value={address.country}
									   placeholder="Country"
									   type="text"
									   class="mt-2 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>
							</div>
						</div>

					</div>

					{#if FIRST_SECTION_OK}
						<button type="submit" id="submit"
								on:click={onFirstNextClick}
								class="mt-auto px-12 bg-amber-700 w-full font-bold text-white py-2 rounded-full hover:bg-amber-900 focus:outline-none transition-all duration-300">
							Next
						</button>
					{:else}
						<button disabled
								class="w-full px-12 bg-zinc-400 opacity-70 font-bold text-white py-2 rounded-full mt-auto">
							Next
						</button>
					{/if}
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

			<div class="p-2 flex-col flex gap-4 border-r-2 border-amber-950/40 {PaymentMethodOpacity}">
				<h1 class="text-center text-xl font-bold text-amber-700 mb-4">
					Payment Method</h1>
				<div class="flex-col flex gap-1">
					<ul class="grid grid-cols-3 gap-1">
						<li>
							<input checked={selectedOption === "card"} class="hidden peer" id="card" name="payment"
								   on:change={onchange} required type="radio"
								   value="card">
							<label class="flex text-sm text-amber-900 font-bold flex-col items-center justify-between
							py-2 w-full border border-amber-300 rounded-lg cursor-pointer peer-checked:border-amber-600
							peer-checked:text-amber-600 hover:text-amber-600 hover:bg-amber-200 transition-all duration-300"
								   for="card">
								<span>
									<img class="w-6 h-6 mb-2" src={card_icon} alt="" />
								</span>
								Card
							</label>
						</li>
						<li>
							<input checked={selectedOption === "bkash"} class="hidden peer" id="bkash" name="payment"
								   on:change={onchange} type="radio" value="bkash">
							<label class="flex text-sm text-amber-900 font-bold flex-col items-center justify-between
							py-2 w-full border border-amber-300 rounded-lg cursor-pointer peer-checked:border-amber-600
							peer-checked:text-amber-600 hover:text-amber-600 hover:bg-amber-200 transition-all duration-300"
								   for="bkash">
								<span>
									<img class="w-6 h-6 mb-2" src={bkash_icon} alt="" />
								</span>
								BKash
							</label>
						</li>
						<li>
							<input checked={selectedOption === "cod"} class="hidden peer" id="cod" name="payment" on:change={onchange}
								   required type="radio"
								   value="cod">
							<label class="flex text-sm text-amber-900 font-bold flex-col items-center justify-between
							py-2 w-full border border-amber-300 rounded-lg cursor-pointer peer-checked:border-amber-600
							peer-checked:text-amber-600 hover:text-amber-600 hover:bg-amber-200 transition-all duration-300"
								   for="cod">
								<span>
									<img class="w-6 h-6 mb-2" src={cod_icon} alt="" />
								</span>
								COD
							</label>
						</li>
					</ul>

					<hr class="my-2">


					{#if selectedOption === 'card'}
						<input required
							   type="text"
							   placeholder="Card Number"
							   class="mt-1 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none
                       focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>

						<input required
							   type="text"
							   placeholder="Card Name"
							   class="font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none
                       focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>

						<div class="flex gap-2">
							<div>
								<input required

									   placeholder="CVV"
									   type="text"
									   class="font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>
							</div>

							<div>
								<input required

									   placeholder="Expiry"
									   type="text"
									   class="font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased disabled:opacity-60"/>
							</div>
						</div>

					{/if}

					{#if selectedOption === 'bkash'}
						<div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
							<div class="mt-4">
								<label for="trxId" class="block text-gray-600 font-semibold mb-1">Transaction ID</label>
								<input type="text" id="trxId" bind:value={bkashInfo.trxId}
									   class="border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"/>
							</div>
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

						</div>

					{/if}



					<button
							class="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl focus:outline-none transition duration-300">
						Next
					</button>
				</div>
			</div>

			<div class="p-2 flex-col flex gap-4 border-r-2 border-amber-950/40 {InstallmentOpacity}">
				<h1 class="text-center text-xl font-bold text-amber-700 mb-4">
					Installment Settings</h1>
			</div>

			<div class="p-2 flex-col flex gap-4 {ConfirmationOpacity}">
				<h1 class="text-center text-xl font-bold text-amber-700 mb-4">
					Confirmation</h1>
			</div>

		</div>
	</main>
</section>


<style>
    .background-animate {
        background-size: 200%;
        -webkit-animation: AnimationName 3s ease infinite;
        -moz-animation: AnimationName 3s ease infinite;
        animation: AnimationName 3s ease infinite;
    }

    @keyframes AnimationName {
        0%,
        100% {
            background-position: 0 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }
</style>