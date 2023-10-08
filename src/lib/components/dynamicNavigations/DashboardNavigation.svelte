<script lang="ts">
    import {enhance} from "$app/forms";
    import cancel_icon from "$lib/assets/icons/sign-up-cancel-icon.svg";
    import {fade} from "svelte/transition";
    import {user} from "$lib/stores/currentNavigation";

    let full_name: string | undefined = undefined;
    let email: string | undefined = undefined;
    let image: string | undefined = undefined;

    // Subscribe to the user store
    user.subscribe((value) => {
        // store the user in local storage
        full_name = value?.full_name;
        email = value?.email;
        image = value?.profile_picture;
    });


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
		<div class="flex gap-4 rounded-full align-middle border-yellow-800/20 border justify-center
		 items-center font-semibold text-yellow-950  hover:bg-yellow-300 hover:border-yellow-800 transition-all duration-300">

			{#if full_name === undefined && email === undefined && image === undefined}
				<h1>Loading</h1>
			{:else }
				<h1 class=" pl-4 font-bold py-2">{full_name}</h1>
				<img alt="profile_picture" class="h-9 w-9 rounded-full" src={image}>
			{/if}
		</div>
	</div>
</div>