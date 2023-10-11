<script lang="ts">
    import {enhance} from "$app/forms";
    import cancel_icon from "$lib/assets/icons/sign-up-cancel-icon.svg";
    import {fade} from "svelte/transition";
    import {onMount} from "svelte";
    import username from "$lib/stores/username";

    let _username: string | null;
    let full_name: string;
    let email: string;
    let image: string;

    username.subscribe(value => {
        _username = value;
    })

    onMount(async () => {
        const response = await fetch('/API/v1/dynamicNavbar/GetUserDetails', {
            method: 'POST',
            body: JSON.stringify({username: _username}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        full_name = data.full_name;
        email = data.email;
        image = data.profile_picture;
    })
</script>

<div class="grid grid-cols-3 items-center">
	<div class="flex justify-start gap-2">
		<form action="?/SignOut" method="POST" use:enhance>
			<button class="px-3 py-2 flex text-sm items-center gap-0.5 align-middle rounded-full font-bold border border-yellow-800 hover:bg-red-100 text-yellow-950 transition-all duration-300" name="log_out"
					type="submit"><span
					class="block h-5 w-5"><img alt="cancel_icon" src={cancel_icon}></span>
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
	</div>

	<div class="gap-x-4 text-xl font-bold text-amber-800 text-center">

		<div in:fade={{ duration: 200, delay: 200 }}>
			<h1>Dashboard</h1>
		</div>

	</div>

	<div class="flex justify-end gap-2 text-sm">

			{#if full_name === undefined && email === undefined && image === undefined}
			<!--	Loading svg -->
			<svg class="animate-spin  h-[30px] w-[30px] mr-1 text-yellow-800" xmlns="http://www.w3.org/2000/svg" fill="none"
				 viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor"
					  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0
					  3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
			{:else }
				<div in:fade class="flex gap-4 rounded-full align-middle border-yellow-800/20 border justify-center items-center font-semibold text-yellow-950  hover:bg-yellow-300 hover:border-yellow-800 transition-all duration-300">
				<h1 class=" pl-4 font-bold py-2">{full_name}</h1>
					<img alt="" class="h-9 w-9 rounded-full" src={image}>
				</div>
			{/if}
	</div>
</div>