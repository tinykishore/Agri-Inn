<script lang="ts">
    import '../tailwind.css';
    import {fade} from 'svelte/transition';
    import Footer from "$lib/components/Footer.svelte";
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import {notificationPanel} from "$lib/stores/NotificationPanel";
    import {formatDateTime, formatEpochToCustom} from "$lib/client/utility";

    export let data;

    let showNotificationPanel = false;

    $: {
        notificationPanel.subscribe((value) => {
            showNotificationPanel = value.show_notification;
        })
    }

</script>

<nav class="top-10 mx-24 rounded-full sticky px-2 py-2 drop-shadow-xl bg-gradient-to-l
from-yellow-100 via-amber-200 to-yellow-100 z-[10000] min-h-fit">
	{#key data.url}
		<div in:fade={{ duration: 200, delay: 200 }}>
			<svelte:component this={$DynamicNavigation}/>
		</div>
	{/key}
</nav>

{#if showNotificationPanel}
	<section class="bg-amber-600/20 shadow-xl flex flex-col gap-4 backdrop-blur-xl fixed
	top-[6.5rem] right-[6.3rem] p-4 w-[27rem] rounded-2xl z-[10000] h-[30rem] overflow-y-scroll">
		<h1 class="text-2xl text-amber-950 font-black">
			Notifications
		</h1>

		<div id="notification_container" class="flex flex-col gap-2">
			{#each data.notifications.notifications as notification}
				{#if notification.seen}
				<div class="bg-white rounded-xl p-4">
					<h1 class="text-xl font-bold text-amber-950">{notification.body}</h1>
					<h1 class="text-sm text-amber-800">{formatDateTime(notification.date)}</h1>
				</div>
				{:else}
				<div class="bg-amber-400 rounded-xl p-4">
					<h1 class="text-xl font-bold text-amber-950">{notification.body}</h1>
					<h1 class="text-sm text-amber-800">{formatDateTime(notification.date)}</h1>
				</div>
				{/if}

			{/each}
		</div>
	</section>
{/if}

{#key data.url}
	<div in:fade={{ duration: 200, delay: 200 }} out:fade={{ duration: 200}}>
		<slot/>
	</div>
{/key}

<Footer/>