<script lang="ts">
    import {fade, fly} from "svelte/transition";
    import close_icon from "$lib/assets/icons/farms_farm_product_id_modal_close_icon.svg";
    import {modals} from "$lib/stores/Modals";
    import {onMount} from "svelte";
    import UserCache from "$lib/stores/UserCache";

    export let event: any;
    let public_profile: any;

    const modalCloseAction = () => {
        modals.update((values) => {
            return {
                ...values,
                events_event_id_modal: false,
            }
        })
    }
	// async function handleRegister() {
	// 	const response = await fetch("/API/v1/events/RegisterEventAPI", {
	// 		method: "POST",
	// 		body: JSON.stringify(
	// 				{
	// 					event_id: event.event_id,
	//
	// 				}
	// 		),
	// 		headers: {
	// 			"Content-Type": "application/json"
	// 		},
	//
	// });
	// 	event = await response.json();
	// }


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

</script>


<section in:fade={{ duration: 200, delay: 200 }}
		 class="fixed bg-fixed grid grid-cols-1 top-0 left-0 h-screen w-screen z-[10000] bg-black/30 backdrop-blur-sm">
	<main in:fly={{ duration: 200, delay: 400 }} class=" h-[80%] flex flex-col w-[80%] place-self-center px-8  py-6 bg-gradient-to-bl
	from-white via-yellow-50 to-amber-100 rounded-2xl shadow-2xl background-animate">
		<div class="font-black text-3xl text-amber-900 flex justify-between mx-6 my-4">
			<h1>Register for {event.event_name} </h1>
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
			{#if public_profile && event}
				<div id="personal_information" class="flex flex-col gap-1">
					<h1>{public_profile.username}</h1>
					<h1>{public_profile.email}</h1>
					<h1>{event.event_name}</h1>
					<h1>{event.event_date}</h1>
				</div>
			{/if}


			<div id="input_section">
				<div class="flex flex-col gap-2">
					<label for="first_name">How many animal</label>
					<input id="first_name" type="text" class="border-2 border-zinc-300 rounded-md"/>
				</div>

				<div class="flex flex-col gap-2">
					<label for="last_name">Time Duration</label>
					<input id="last_name" type="text" class="border-2 border-zinc-300 rounded-md"/>
				</div>

				<div class="flex flex-col gap-2">
					<label for="last_name">Required Space</label>
					<input id="last_name" type="text" class="border-2 border-zinc-300 rounded-md"/>
				</div>

				<div class="flex flex-col gap-2">
					<label for="last_name">Required Equipments</label>
					<input id="last_name" type="text" class="border-2 border-zinc-300 rounded-md"/>
				</div>

				<div class="flex flex-col gap-2">
				<button class="bg-zinc-400 mt-1.5 text-white w-fit font-bold py-1 px-2.5 rounded-full " on:click={handleRegister}>
					Register Now
				</button>
				</div>

			</div>

		</div>

	</main>

</section>