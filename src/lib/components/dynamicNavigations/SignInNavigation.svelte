<script lang="ts">
    import {fade} from "svelte/transition";
    import cancel_icon from "$lib/assets/icons/sign-up-cancel-icon.svg";
    import google_icon from "$lib/assets/icons/google-auth.svg";

    let error_message: string = "";
    let error: boolean = false;

    let sentences: Record<number, string> = {
        0: "Welcome back! It's great to have you here",
        1: "We've missed you! Thanks for signing in",
        2: "You're back! We've been waiting for you",
        3: "Good to see you again! Let's get started",
        4: "Hello again! Ready to access your account?",
        5: "You're in! Let's continue where you left off.",
        6: "You've returned! Your journey continues.",
        7: "We're delighted you're back!",
        8: "Sign in and let's go!",
        9: "It's a pleasure to have you back with us!"
    }

    let randomChoice: number = Math.floor(Math.random() * 10);
    let greetingMessage: string = sentences[randomChoice];

    setInterval(function () {
        if (!error) {
            let random = Math.floor(Math.random() * 10);
            greetingMessage = sentences[random];
        }
    }, 10000);
</script>

<div class="grid grid-cols-3 items-center">
	<div class="flex justify-start gap-2">
		<a href="/"
		   class="px-3 py-2 text-sm flex items-center gap-0.5 align-middle rounded-full font-bold border border-yellow-800
		   hover:bg-amber-300 text-yellow-950 transition-all duration-300">
			<span class="block h-5 w-5 mr-1">
				<img alt="cancel_icon" src={cancel_icon}>
			</span>
			Go to Home
		</a>
		<form action="?/OAuth" method="POST">
			<button class="px-3 py-2 flex bg-white items-center gap-2 align-middle rounded-full font-bold hover:bg-zinc-100
               transition-all duration-300 text-sm" name="google-sign-in"
					type="submit"><span
					class="block h-5 w-5"><img alt="search_icon" src={google_icon}></span>
				Sign In with Google
			</button>
		</form>
	</div>

	<div class="gap-x-4 text-xl font-bold text-amber-800 text-center">
		{#key greetingMessage}
			<div in:fade={{ duration: 200, delay: 200 }}>
				{#if !error}
					<h1>{greetingMessage}</h1>
				{:else}
					<h1 class="animate-pulse">{error_message}</h1>
				{/if}
			</div>
		{/key}
	</div>

	<div class="flex justify-end gap-2 ">
		<a href="/sign-up"
		   class=" px-6 py-2 text-sm rounded-full font-semibold hover:bg-amber-300 text-yellow-950 transition-all duration-300">
			Forgot Password?
		</a>
		<a href="/sign-up"
		   class=" px-6 py-2 text-sm rounded-full bg-amber-700 hover:bg-amber-900 text-white transition-all duration-300">
			<span class="font-bold">New to Agri-Inn?</span>
		</a>
	</div>
</div>