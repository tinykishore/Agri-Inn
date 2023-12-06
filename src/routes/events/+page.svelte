<script lang="ts">
    import {onMount} from "svelte";
    import cow_image from "$lib/assets/images/cow.jpg";
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import EventsNavigation from "$lib/components/dynamicNavigations/events/EventsNavigation.svelte";

    let data: any = [];

    DynamicNavigation.set(EventsNavigation);

    onMount(async () => {
        const response = await fetch('/API/v1/events/GetAllEventsAPI');
        data = await response.json();
    });
</script>


<main class="mx-32 my-28">

	{#if data}
		<div class="grid grid-cols-3 gap-4">
			{#each data as event}
				<a href="/events/{event._id}" class="rounded-2xl border border-amber-950 hover:shadow-xl
				transition-all duration-300">
					<img class="rounded-t-2xl h-38" src={event.img} alt=""/>
					<div class="p-4 flex flex-col gap-1">
						<h1 class="text-amber-950"><span class="bg-amber-800 px-2 py-1 text-white font-medium text-sm
						rounded-full">{event.location}</span></h1>
						<h1 class="text-2xl font-bold text-amber-900">{event.event_name}</h1>
						<h1>{event.description}</h1>
					</div>

					<div class="flex justify-center  p-4 bg-gradient-to-b from-amber-50 to-amber-100 rounded-b-2xl">
						<div class="text-amber-950 font-semibold ">Created at {event.event_date}</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}

</main>