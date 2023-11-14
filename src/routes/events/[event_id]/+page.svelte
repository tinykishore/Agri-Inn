<script lang="ts">
    import {onMount} from "svelte";
    import UserCache from "$lib/stores/UserCache";
    import {USER_ROLE} from "$lib/client/utility";
    import Registration from "./Registration.svelte";
    import {modals} from "$lib/stores/Modals";

    export let data;

    let event: any;

    let user_role: any;

    UserCache.subscribe((value) => {
        user_role = value.user_role;
    });

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
		<h1>{event._id}</h1>

		<div class="rounded-xl p-4 bg-beige-dark hover:shadow-lg transition-all duration-300 flex flex-col gap-2">
			<iframe title="Haat" class="h-52 w-[21rem] rounded-2xl border"
					src="https://www.openstreetmap.org/export/embed.html?bbox=90.4473602771759%2C23.796357186638033%2C90.45122265815735%2C23.79806774014946&amp;layer=mapnik&amp;marker=23.79721246620885%2C90.44929146766663">
			</iframe>

			<a href="https://www.openstreetmap.org/?mlat=23.79721&amp;mlon=90.44929#map=19/23.79721/90.44929"
			   class="text-center w-full mt-2 font-bold select-none text-gray-500 hover:underline">
				View Location
			</a>
		</div>

		{#if user_role === USER_ROLE.OWNER}
			<div>
				<button on:click={onRegisterClick}
						class="px-4 py-2 rounded-2xl bg-orange-500 font-bold">
					Register
				</button>
			</div>
		{/if}
	{/if}
</main>