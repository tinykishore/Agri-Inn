<script lang="ts">
    import {onMount} from "svelte";
    import {USER_ROLE} from "$lib/client/utility";
    import UserCache from "$lib/stores/UserCache";

    let data: any = [];



    onMount(async () => {
        const response = await fetch('/API/v1/events/GetAllEventsAPI');
        data = await response.json();

        console.log(data);

    });

</script>


<main class="mx-32 my-28">

	{#if data}
		<div class="grid grid-cols-3 gap-4">


			{#each data as event}
				<a href="/events/{event._id}"
				   class="p-4 bg-amber-100 flex justify-between rounded-2xl align-middle items-center "
				>
					<div class="flex flex-col gap-1">
						<h1>{event._id}</h1>
						<h1>{event.event_name}</h1>
						<h1>{event.event_date}</h1>
					</div>



				</a>
			{/each}
		</div>
	{/if}

</main>