<script lang="ts">
    import {enhance} from "$app/forms";
    import cancel_icon from "$lib/assets/icons/sign-up-cancel-icon.svg";
    import {fade} from "svelte/transition";
    import UserCache from "$lib/stores/UserCache";
    import {isUnseenNotification, isUserCacheValid} from "$lib/client/utility";
    import {onMount} from "svelte";
    import seenNotification from "$lib/assets/notificationIcon/notification-bell.png";
    import unseenNotification from "$lib/assets/notificationIcon/notification.png";
    import {notificationPanel} from "$lib/stores/NotificationPanel";
    import {modals} from "$lib/stores/Modals";


    let username: string | undefined;
    let full_name: string | undefined;
    let profile_picture: string | undefined;
    let UserCacheValid = isUserCacheValid();

	let isUnseen = false;
	let notificationBox = false;

    UserCache.subscribe((value) => {
        username = value.username;
        full_name = value.full_name;
        profile_picture = value.profile_picture;
    });

    const onSignOutClick = () => {
        document.getElementById('close_image')?.classList.add('hidden');
        document.getElementById('sign_out_spinner')?.classList.remove('hidden');
    }

	onMount(async () => {
		const response = await fetch('/API/v1/GetNotificationAPI', {
			method: "POST",
			body: JSON.stringify({
				"username": username
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		isUnseen = isUnseenNotification(data.notifications);

	});
	export let showNotification = () => {
        notificationPanel.update((values) => {
            return {
                ...values,
                show_notification: !values.show_notification
            }
        })
        isUnseen = false;
	}

    $: {
        notificationPanel.subscribe((values) => {
			notificationBox = values.show_notification;
		})
	}


</script>

<div class="grid grid-cols-3 items-center">
	<div class="flex justify-start gap-2">
		<form action="/dashboard" method="POST" use:enhance>
			<button class="px-3 py-2 flex text-sm items-center gap-0.5 align-middle rounded-full font-bold border border-yellow-800 hover:bg-red-100 text-yellow-950 transition-all duration-300" name="log_out"
					type="submit" on:click={onSignOutClick}>
				<span id="close_image" class="block h-5 w-5 mr-1">
					<img alt="cancel_icon" src={cancel_icon}>
				</span>
				<span id="sign_out_spinner" class="hidden">
					<svg class="animate-spin h-5 w-5 mr-1 text-yellow-800" xmlns="http://www.w3.org/2000/svg"
						 fill="none"
						 viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
								stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor"
							  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0
							  3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
				</span>
				Sign Out
			</button>
		</form>
		<form action="?/OAuth" method="POST">
			<button class="px-3 py-2 text-sm flex bg-white items-center gap-2 align-middle rounded-full font-bold hover:bg-zinc-100
               transition-all duration-300" name="google-sign-in"
					type="submit">
				Hello
			</button>
		</form>

		<a href="/installments" class="px-3 py-2 text-sm flex bg-white items-center gap-2 align-middle rounded-full font-bold hover:bg-zinc-100
               transition-all duration-300"
				type="submit">
			Installments
		</a>
	</div>

	<div class="gap-x-4 text-xl font-bold text-amber-800 text-center">

		<div in:fade={{ duration: 200, delay: 200 }}>
			<h1>Dashboard</h1>
		</div>

	</div>

	<div class="flex justify-end gap-2 text-sm">
		{#if isUnseen}
			<button on:click={showNotification} in:fade
			   class="mr-4 flex gap-4 rounded-full align-middle justify-center items-center font-semibold text-yellow-950  hover:bg-yellow-300 hover:border-yellow-800 transition-all duration-300">
				<img class="h-8 w-8 mr-4" src={unseenNotification} alt="">
			</button>
		{:else}
			<button on:click={showNotification} in:fade
			   class="mr-4 flex gap-4 rounded-full align-middle justify-center items-center font-semibold text-yellow-950  hover:bg-yellow-300 hover:border-yellow-800 transition-all duration-300">
				<img class="h-9 w-9 " src={seenNotification} alt="">
			</button>
		{/if}

			{#if !UserCacheValid}
			<svg class="animate-spin  h-[30px] w-[30px] mr-1 text-yellow-800" xmlns="http://www.w3.org/2000/svg" fill="none"
				 viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor"
					  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0
					  3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
			{:else}
				<a href="/{username}" in:fade
				   class="flex gap-4 rounded-full align-middle border-yellow-800/20 border justify-center items-center font-semibold text-yellow-950  hover:bg-yellow-300 hover:border-yellow-800 transition-all duration-300">
					<h1 class=" pl-4 font-bold py-2">{full_name?.split(" ")[0]}</h1>
					<img alt="" class="h-9 w-9 rounded-full" src={profile_picture}>
				</a>
			{/if}
	</div>
</div>