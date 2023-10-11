<script lang="ts">
    import signInBg from "$lib/assets/images/sign-in-bg.jpg"
    import signInBgArt from "$lib/assets/images/sign-in-bg-art.svg"
    import currentNavigation from "$lib/stores/currentNavigation";
    import SignInNavigation from "$lib/components/dynamicNavigations/SignInNavigation.svelte";
    import logo from "$lib/assets/icons/logo.svg";
    import {redirect} from "@sveltejs/kit";
    import {goto} from "$app/navigation";

    currentNavigation.set(SignInNavigation);

    // Credentials Object
    const credentials: SignInCredentials = {
        key: '',
        password: ''
    };

    const onPasswordInput = (event: any) => {
        event.target.classList.remove('border-red-400');
    }

    const onSignInButtonClick = () => {
        document.getElementById('submit')?.classList.remove('text-white');
        document.getElementById('submit')?.classList.add(
            'bg-transparent',
            'text-amber-800',
            'hover:bg-transparent',
            'hover:shadow-none'
        );
        document.getElementById('submit')!.innerHTML = 'Signing in';
        //document.getElementById('loader_icon')?.classList.remove('hidden');
    }

    const handleSubmit = async () => {
        // Send credentials to server and await response
        // Server response : {token: token, name: name, email: email}
        const response = await fetch('/API/v1/auth/SignInAPI', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Update UI
            document.getElementById('key')!.classList.remove('border-red-400');
            document.getElementById('password')!.classList.remove('border-red-400');
            document.getElementById('key')!.classList.add('bg-green-200');
            document.getElementById('key')!.classList.add('border-green-200');
            document.getElementById('password')!.classList.add('bg-green-200');
            document.getElementById('password')!.classList.add('border-green-200');

            await goto('/dashboard');
        }
        // If response is not ok, update UI with error UI
        else {
            // Update UI
            document.getElementById('key')!.classList.add('border-red-400');
            document.getElementById('password')!.classList.add('border-red-400');
            document.getElementById('password')!.nextElementSibling!.classList.remove('invisible');
            document.getElementById('submit')!.innerHTML = 'Log in';
            document.getElementById('submit')!.classList.add('text-white');
            document.getElementById('submit')!.classList.remove(
                'bg-transparent',
                'border',
                'text-teal-800',
                'hover:bg-transparent',
                'hover:shadow-none'
            );
            //document.getElementById('loader_icon')!.classList.add('hidden');
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
	<div class="mx-auto w-fit mt-24 grid grid-cols-2 justify-between rounded-2xl xl:grid-cols-2 bg-white/60 backdrop-blur-md shadow-2xl">
		<form on:submit|preventDefault="{handleSubmit}"
			  class=" rounded-l-2xl p-8 flex flex-col place-self-center bg-yellow-50/50 w-full h-full">
			<div class="mb-4">
				<label for="username" class="block font-bold text-gray-600 text-center">Username or Email</label>
				<input required
					   type="text" id="key" name="key" bind:value={credentials['key']}
					   class="mt-2 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full text-center outline-none
                       focus:shadow-md block w-full p-2.5 transition-all duration-300 antialiased">
			</div>

			<div class="mb-4">
				<label for="password"
					   class="block font-bold text-gray-600 text-center">
					Password
				</label>
				<input required on:input={onPasswordInput} bind:value={credentials['password']}
					   type="password" id="password" name="password"
					   class="mt-2 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full text-center outline-none
                       focus:shadow-md block w-full p-2.5 transition-all duration-300 antialiased">
			</div>

			<div class="mb-4 place-self-center">
				<button type="submit" id="submit"
						on:click={onSignInButtonClick}
						class="w-fit px-12 bg-amber-700 font-bold text-white py-2 rounded-full hover:bg-amber-900 focus:outline-none transition-all duration-300">
					Sign In
				</button>
			</div>
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