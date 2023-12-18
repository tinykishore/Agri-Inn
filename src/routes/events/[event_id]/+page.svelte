<script lang="ts">
    import {onMount} from "svelte";
    import UserCache from "$lib/stores/UserCache";
    import {USER_ROLE} from "$lib/client/utility";
    import Registration from "./Registration.svelte";
    import {modals} from "$lib/stores/Modals";
    import cow_image from "$lib/assets/images/cow.jpg";
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import EventsNavigation from "$lib/components/dynamicNavigations/events/EventsNavigation.svelte";

    DynamicNavigation.set(EventsNavigation);
    export let data;

    let event: any;

    let user_role: any;

    UserCache.subscribe((value) => {
        user_role = value.user_role;
    });
	let isOwner = false;

	if(user_role === USER_ROLE.OWNER){
		isOwner = true;
	}

    let isRegistrationSectionVisible: boolean = false;

    modals.subscribe((value) => {
        isRegistrationSectionVisible = value.events_event_id_modal;
    });


    onMount(async () => {
        // POST API REQ, GET one EVENT data

        const response = await fetch("/API/v1/events/GetOneEventAPI", {
            method: "POST",
            body: (JSON.stringify(data.event_id)),
            headers: {
                "Content-Type": "application/json"
            },
        });

        event = await response.json();

    });

    const onRegisterClick = () => {
        modals.update((value) => {
            return {
                ...value,
                events_event_id_modal: true
            }
        });
    }

</script>

{#if isRegistrationSectionVisible}
	<Registration event={event}/>
{/if}

<main class="mx-32 my-28">
	{#if event}

		<div class="flex w-full justify-center align-middle items-center ">
			<div class="flex flex-col justify-center items-center px-3 rounded-2xl py-2 bg-amber-100">
				<h1 class="text-amber-900 font-bold">Event Created</h1>
				<h1>{event.created_at}</h1>
			</div>
			<hr class="rounded-full py-0.5 px-32 bg-gradient-to-r from-amber-200 to-red-200 ">
			<div class="flex flex-col justify-center items-center px-3 rounded-2xl py-2 bg-red-200">
				<h1 class="text-red-900 font-bold">Registration Deadline</h1>
				<h1>{event.registration_deadline}</h1>
			</div>
			<hr class="rounded-full py-0.5 px-32 bg-gradient-to-r from-red-200 to-green-200">
			<div class="flex flex-col justify-center items-center px-3 rounded-2xl py-2 bg-green-200">
				<h1 class="text-green-900 font-bold">Registration Deadline</h1>
				<h1>{event.event_date}</h1>
			</div>
		</div>

		<div class="flex justify-between items-center align-middle mt-8">
			<div class="flex flex-col gap-1">
				<h1 class="text-5xl font-bold text-amber-950">{event.event_name}</h1>
				<h1 class="text-zinc-500 ">{event.description}</h1>
				<h1 class="text-amber-950 mt-4"><span class="bg-amber-800 px-4 py-1 text-white font-medium text-sm
						rounded-full">{event.location}</span></h1>
				{#if user_role === USER_ROLE.OWNER}
					<div class="">
						{#if isOwner}
						<button on:click={onRegisterClick}
								class="px-8 py-2 rounded-full bg-amber-900 text-white mt-4 font-bold hover:shadow-xl hover:bg-amber-700 transition-all duration-300">
							Register
						</button>
						{/if}
					</div>
				{/if}
			</div>
			<img src={event.img} alt="cow" class="w-[40%] rounded-2xl border"/>
		</div>

		<div class="rounded-xl p-4 bg-beige-dark hover:shadow-lg transition-all duration-300 flex flex-col gap-2">
			<iframe title="Haat" class="h-52 w-[21rem] rounded-2xl border"
					src="https://www.openstreetmap.org/export/embed.html?bbox=90.4473602771759%2C23.796357186638033%2C90.45122265815735%2C23.79806774014946&amp;layer=mapnik&amp;marker=23.79721246620885%2C90.44929146766663">
			</iframe>

			<a href="https://www.openstreetmap.org/?mlat=23.79721&amp;mlon=90.44929#map=19/23.79721/90.44929"
			   class="text-center w-full mt-2 font-bold select-none text-gray-500 hover:underline">
				View Location
			</a>
		</div>

		{event.created_by.user_id}
		{event.created_by.username}
		{event.participants_limit}
		{event.additional_details}

		{#each event.registered_farms as farm}
			{farm}
		{/each}


	{/if}
</main>

<style>
	.ok {

	}
</style>