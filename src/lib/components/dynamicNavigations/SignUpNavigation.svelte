<script lang="ts">
    import cancel_icon from "$lib/assets/icons/sign-up-cancel-icon.svg";
    import google_icon from "$lib/assets/icons/google-auth.svg";
    import {fade} from "svelte/transition";

    let page: Record<number, string> = {
        1: "First of all, Account Information",
        2: "Secondly, Personal Information",
        3: "Finishing Up",
    }

    let pageCount = 1;
</script>

<div class="grid grid-cols-3 items-center">
	<div class="flex justify-start gap-2">
		<a class="px-3 py-2 flex text-sm items-center gap-0.5 align-middle rounded-full font-bold border border-yellow-800 hover:bg-red-100 text-yellow-950 transition-all duration-300"
		   href="/"><span
				class="block h-5 w-5"><img alt="cancel_icon" src={cancel_icon}></span>
			Cancel
		</a>
		<form action="?/OAuth" method="POST">
			<button class="px-3 py-2 text-sm flex bg-white items-center gap-2 align-middle rounded-full font-bold hover:bg-zinc-100
               transition-all duration-300" name="google-sign-in"
					type="submit"><span
					class="block h-5 w-5"><img alt="search_icon" src={google_icon}></span>
				Sign Up with Google
			</button>
		</form>
	</div>

	<div class="gap-x-4 text-xl font-bold text-amber-800 text-center">
		{#key pageCount}
			<div in:fade={{ duration: 200, delay: 200 }}>
				<h1>{page[pageCount]}</h1>
			</div>
		{/key}
	</div>

	<div class="flex justify-end gap-2 text-sm">
		<a class="px-4 py-2 rounded-full border-0 text-yellow-950  hover:bg-yellow-300 transition-all duration-300"
		   href="/sign-in">
			Already have an account? <span class="font-semibold">Sign In</span>
		</a>
	</div>
</div>