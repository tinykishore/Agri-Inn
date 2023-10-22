<script lang="ts">
    import signInBg from "$lib/assets/images/sign-in-bg.jpg"
    import signInBgArt from "$lib/assets/images/sign-in-bg-art.svg"
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import SignInNavigation from "$lib/components/dynamicNavigations/SignInNavigation.svelte";
    import logo from "$lib/assets/icons/logo.svg";
    import {goto} from "$app/navigation";
    import {USER_ROLE} from "$lib/client/utility";
    import {fade} from "svelte/transition";
    import UserCache from "$lib/stores/UserCache";

    DynamicNavigation.set(SignInNavigation);

    // Credentials Object
    const credentials: SignInCredentials = {
        key: '',
        password: ''
    };

    const onPasswordInput = (event: any) => {
        event.target.classList.remove('border-red-400');
        document.getElementById('error-message')!.classList.add('invisible');
    }

    const onKeyInput = (event: any) => {
        event.target.classList.remove('border-red-400');
        document.getElementById('error-message')!.classList.add('invisible');
    }

    /**
     * Handle the button click event for signing in and update the UI.
     */
    const onSignInButtonClick = () => {
		document.getElementById('sign_in_spinner')!.classList.remove('hidden');
		document.getElementById('submit_button')!.classList.add('hidden');
    }

    /**
     * Handle the form submission, sending credentials to the server and updating the UI accordingly.
     */
    const handleSubmit = async () => {
        // Send credentials to server and await response
        const response = await fetch('/API/v1/auth/SignInAPI', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Extract response data
        if (response.ok) {
            // Update UI
            document.getElementById('key')!.classList.remove('border-red-400');
            document.getElementById('password')!.classList.remove('border-red-400');
            document.getElementById('key')!.classList.add('bg-green-200');
            document.getElementById('key')!.classList.add('border-green-200');
            document.getElementById('password')!.classList.add('bg-green-200');
            document.getElementById('password')!.classList.add('border-green-200');

            // Get response data, check user role
            const data = await response.json();
            UserCache.update(value => {
                value.full_name = data.full_name;
                value.email = data.email;
                value.profile_picture = data.profile_picture;
                value.username = data.username;
                value.user_role = data.user_role;
                return value;
            });

            if (data.role === USER_ROLE.ADMIN) await goto("/admin");
            else await goto("/dashboard");

        }
        // If response is not ok, update UI with error UI
        else {
            // Update UI
            document.getElementById('key')!.classList.add('border-red-400');
            document.getElementById('password')!.classList.add('border-red-400');
            document.getElementById('sign_in_spinner')!.classList.add('hidden');
            document.getElementById('submit_button')!.classList.remove('hidden');
            document.getElementById('error-message')!.classList.remove('invisible');
        }
    }
</script>

<svelte:head>
	<title>Sign In | Agri-Inn</title>
	<meta name="description" content="Sign in to your Agri-Inn account">
	<meta name="robots" content="noindex">
	<meta name="googlebot" content="noindex">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="theme-color" content="#ffffff">
</svelte:head>

<section class="absolute top-0 left-0 h-screen w-screen -z-50">
	<img class="w-full h-full object-cover" src="{signInBg}" alt="sign-in-bg">
</section>

<main class="flex items-center justify-center min-h-screen -mt-16 overscroll-y-none" id="body">
	<div class="mx-auto w-fit mt-20 grid grid-cols-2 justify-between rounded-2xl xl:grid-cols-2 bg-white/60 backdrop-blur-md shadow-2xl">

		<form on:submit|preventDefault="{handleSubmit}"
			  class="rounded-l-2xl p-8 flex flex-col bg-yellow-50/50 w-full h-full justify-between">
			<div>
				<h1 class="text-2xl font-black text-yellow-950 mb-4">
					Sign In
				</h1>

			</div>

			<div class="flex flex-col gap-3">
				<div class="mb-1">
					<label class="block font-bold text-gray-600 ml-3" for="username">Username or Email</label>
					<label class="block font-light text-xs text-gray-600 ml-3" for="username">Make sure you are
						registered with us!</label>
					<input required on:input={onKeyInput}
						   type="text" id="key" name="key" bind:value={credentials['key']}
						   class="mt-2 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none
                       focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased">
				</div>

				<div class="mb-1">
					<label class="block font-bold text-gray-600 ml-3" for="password">Password</label>
					<label class="block font-light text-xs text-gray-600 ml-3" for="username">Watch out for caps
						lock!</label>

					<input required on:input={onPasswordInput} bind:value={credentials['password']}
						   type="password" id="password" name="password"
						   class="mt-2 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none
                       focus:shadow-md block w-full py-2.5 px-3 transition-all duration-300 antialiased">
				</div>

				<div id="error-message" class="invisible text-center text-sm text-red-500 font-medium mt-1 mb-2">
					Credential Error
				</div>

				<div class="mx-auto" id="submit_button">
					{#if (credentials.key.length > 0 && credentials.password.length > 0)}
						<button type="submit" id="submit"
								on:click={onSignInButtonClick}
								class="w-fit px-12 bg-amber-700 font-bold text-white py-2 rounded-full hover:bg-amber-900 focus:outline-none transition-all duration-300">
							Sign In
						</button>
					{:else}
						<button type="submit" id="submit" disabled
								on:click={onSignInButtonClick}
								class="w-fit px-12 bg-zinc-400 opacity-70 font-bold text-white py-2 rounded-full">
							Sign In
						</button>
					{/if}

				</div>

				<div in:fade
					 class="flex gap-x-3 py-2 hidden align-middle items-center justify-center"
					 id="sign_in_spinner">
				<span>
					<svg class="animate-spin h-5 w-5 text-yellow-800" xmlns="http://www.w3.org/2000/svg"
						 fill="none"
						 viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
								stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor"
							  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
						</path>
					</svg>
				</span>
					<h1 class="animate-pulse text-amber-700 font-bold">Signing In ...</h1>
				</div>
			</div>


			<h1 class="text-zinc-500 text-sm">
				Need Help Signing In?
				<a href="/"
				   class="font-semibold hover:underline transition-all duration-300 text-yellow-950">
					Contact Us
				</a>
			</h1>
		</form>

		<div class="flex flex-col items-end gap-4 p-8">
			<a href="/">
				<img src="{logo}" alt="" class="w-32">
			</a>
			<p class="select-none w-fit text-end font-bold bg-gradient-to-l from-0%
			from-amber-600 to-yellow-600 bg-clip-text text-transparent">
				Let's venture <br>Into the world of agriculture together
			</p>
			<img src={signInBgArt} alt="logo" class="h-64 w-full place-items-center">
			<p class="pt-4 text-xs font-light text-amber-800 text-start justify-end">
				2023 &copy; Agri-Inn. All rights reserved.
			</p>
		</div>
	</div>
</main>
