<script lang="ts">
    import {modals} from "$lib/stores/Modals";
    import {fade, fly} from "svelte/transition";
    import close_icon from "$lib/assets/icons/farms_farm_product_id_modal_close_icon.svg";
    import {onMount} from "svelte";
    import UserCache from "$lib/stores/UserCache";
    import FirstSection from "$lib/components/payment-section/FirstSection.svelte";
    import Payment from "$lib/stores/Payment";
    import payment from "$lib/stores/Payment";
    import SecondSection from "$lib/components/payment-section/SecondSection.svelte";
    import ThirdSection from "$lib/components/payment-section/ThirdSection.svelte";

    export let user_id: string;
    export let product_id: string;
    export let farm_id: string;
	export let total_price: number;

	let remaining_installment: number;

    let public_profile: PublicProfile;

    let paymentInformation: PaymentObject;

	let next_month_date: Date = new Date();
	next_month_date.setMonth(next_month_date.getMonth() + 1);


    Payment.update((values) => {
        return {
            ...values,
            user_id,
			product_id,
			farm_id,
			total_price,
        }
    })

	payment.subscribe(value => {
		paymentInformation = value;
	});

	const modalCloseAction = () => {
		modals.set({
			farms_farm_product_modal: false,
		})
	}

	onMount(async () => {
        let username: string | undefined;

        UserCache.subscribe(value => {
            username = value.username;
        })

        const response = await fetch('/API/v1/auth/GetPublicProfile', {
            method: 'POST',
            body: JSON.stringify({
                "username": username,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        public_profile = await response.json();
    });

    const processPayment = async () => {
		const response = await fetch('/API/v1/farms/PlaceOrderAPI', {
			method: 'POST',
			body: JSON.stringify(
				paymentInformation
			),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const orderInfo = await response.json();
		if(paymentInformation.installment!=undefined){

			const installmentInformation: InstallmentObject = {
                user_id: paymentInformation.user_id,
				payment_id: orderInfo.insertedId,
				product_id: paymentInformation.product_id,
				installment_no: paymentInformation.installment,
				next_installment_date: next_month_date,
				remaining_installment: paymentInformation.installment-1,
				paid_amount: total_price/paymentInformation.installment,
                due_amount: total_price - (total_price / paymentInformation.installment),
                monthly_fee: total_price/paymentInformation.installment,
			}

			total_price = total_price/paymentInformation.installment;

			const response = await fetch('/API/v1/farms/PlaceInstallmentAPI', {
				method: 'POST',
				body: JSON.stringify(
					installmentInformation
				),
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	}



</script>

<section in:fade={{ duration: 200, delay: 200 }}
		 class="fixed bg-fixed grid grid-cols-1 top-0 left-0 h-screen w-screen z-[10000] bg-black/30 backdrop-blur-sm">
	<main in:fly={{ duration: 200, delay: 400 }} class=" h-[80%] flex flex-col w-[80%] place-self-center px-8  py-6 bg-gradient-to-bl
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
			<FirstSection public_profile={public_profile}/>
			<SecondSection/>
			<ThirdSection/>

			<div class="p-2 flex-col flex gap-4">
				<h1 class="text-center text-xl font-bold text-amber-700 mb-6">
					Confirmation
				</h1>
				<h1> {paymentInformation.farm_id}</h1>
				<h1> {paymentInformation.user_id}</h1>
				<h1> {paymentInformation.total_price}</h1>
				<h1> {paymentInformation.product_id}</h1>
				<h1> {paymentInformation.shipping_address.street}</h1>
				<h1> {paymentInformation.shipping_address.city}</h1>
				<h1> {paymentInformation.shipping_address.state}</h1>
				<h1> {paymentInformation.shipping_address.zip}</h1>
				<h1> {paymentInformation.shipping_address.country}</h1>
				<h1> {paymentInformation.payment.bkash_number}</h1>
				<h1> {paymentInformation.payment.method}</h1>
				<h1> {paymentInformation.payment.card_cvv}</h1>
				<h1> {paymentInformation.payment.card_expiration}</h1>
				<h1> {paymentInformation.payment.card_number}</h1>
				<h1> {paymentInformation.payment.card_holder}</h1>
				<h1> {paymentInformation.installment}</h1>

				<button on:click={processPayment}>
					<span class="text-center text-xl font-bold text-amber-700 mb-6">
						Confirm
					</span>
				</button>
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