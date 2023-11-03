<script>
	import {modals} from "$lib/stores/Modals";
	import {fade, fly} from "svelte/transition";
	import close_icon from "$lib/assets/icons/farms_farm_product_id_modal_close_icon.svg";

	const modalCloseAction = () => {
		modals.set({
			farms_farm_product_modal: false,
		})
	}

</script>

<section in:fade={{ duration: 200, delay: 200 }}
		 class="fixed bg-fixed grid grid-cols-1 top-0 left-0 h-screen w-screen z-[10000] bg-black/30 backdrop-blur-sm">
	<main in:fly={{ duration: 200, delay: 400 }} class=" h-[90%] flex flex-col w-[90%] place-self-center px-8  py-6 bg-gradient-to-bl
	from-white via-yellow-50 to-amber-100 rounded-2xl shadow-2xl background-animate">
		<div class="font-black text-3xl text-amber-900 flex justify-between mx-6 my-4">
			<h1 >Payment Process</h1>
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

		<div class="w-full  h-full grid-cols-4 grid">
			<div class="p-2 flex-col flex gap-4 border-r-2 border-amber-950/40">
				<h1 class="text-center">
					Personal Information
				</h1>

				<button>
					Next
				</button>
			</div>
			<div class="p-2 flex-col flex gap-4 border-r-2 border-amber-950/40">
				<h1 class="text-center">
					Payment Method
				</h1>
			</div>
			<div class="p-2 flex-col flex gap-4 border-r-2 border-amber-950/40">
				<h1 class="text-center">
					Installment Settings
				</h1>
			</div>
			<div class="p-2 flex-col flex gap-4">
				<h1 class="text-center">
					Confirmation
				</h1>
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