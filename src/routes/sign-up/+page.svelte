<script lang="ts">
    import signInBg from "$lib/assets/images/sign-in-bg.jpg"
    import signInBgArt from "$lib/assets/images/sign-in-bg-art.svg"
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import logo from "$lib/assets/icons/logo.svg";
    import {fade} from "svelte/transition";
    import SignUpNavigation from "$lib/components/dynamicNavigations/SignUpNavigation.svelte";
    import sign_up_logo from "$lib/assets/icons/sign-up-logo.svg";

    DynamicNavigation.set(SignUpNavigation);

    let full_name: string;
    let email: string;
    let password: string;
    let confirm_password: string;
    let user_name: string;

    let isEmailValid = false;
    let isPasswordValid = false;

    let pageChange = 0;

    const handleSubmit = async () => {

    }

    const validateEmail = async (event: any) => {
        const email = event.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) && email !== '') {
            event.target.classList.add('border-red-400');
            event.target.parentElement.children[1].innerHTML = 'Invalid Email Address';
            event.target.parentElement.children[1].classList.add('text-red-600');
            isEmailValid = false;
        } else {
            event.target.classList.remove('border-red-400');
            event.target.parentElement.children[1].innerHTML = 'The Email Address You Want to Register';
            event.target.parentElement.children[1].classList.remove('text-red-600');
            isEmailValid = true;
        }
    };

    const validatePassword = async (event: any) => {
        const password = event.target.value;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/;
        if (!passwordRegex.test(password) && password !== '') {
            event.target.classList.add('border-red-400');

        } else {
            event.target.classList.remove('border-red-400');
        }
    };

    const crossCheckPassword = async (event: any) => {
        const confirm_password = event.target.value;
        if (confirm_password !== password) {
            event.target.parentElement.children[1].innerHTML = 'Password Mismatch';
            event.target.parentElement.children[1].classList.add('text-red-600');
            event.target.classList.add('border-red-400');
        } else {
            event.target.parentElement.children[1].innerHTML = 'Enter the Password Again';
            event.target.parentElement.children[1].classList.remove('text-red-600');
            event.target.classList.remove('border-red-400');
        }
    }

    const validateUsername = async (event: any) => {
        // cannot start with number
        // cannot contain special characters
        // cannot contain spaces
        const username = event.target.value;
        const usernameRegex = /^[a-zA-Z0-9]+$/;

        if ((!usernameRegex.test(username) && username !== '') || username.includes(' ')) {
            event.target.classList.add('border-red-400');
            event.target.parentElement.children[1].innerHTML = 'Invalid Username';
            event.target.parentElement.children[1].classList.add('text-red-600');
        } else {
            event.target.classList.remove('border-red-400');
            event.target.parentElement.children[1].innerHTML = 'The unique username you will use to login';
            event.target.parentElement.children[1].classList.remove('text-red-600');
        }
    }

</script>

<svelte:head>
	<title>Sign Up | Agri-Inn</title>
	<meta content="Sign Up to Agri-Inn" name="description">
	<meta content="Agri-Inn, Sign Up, Agriculture, Farming" name="keywords">
	<meta content="Sign Up | Agri-Inn" property="og:title">
	<meta content="Sign Up to Agri-Inn" property="og:description">
	<meta content="website" property="og:type">
</svelte:head>

<section class="absolute top-0 left-0 h-screen w-screen -z-50">
	<img alt="sign-in-bg" class="w-full h-full object-cover" src="{signInBg}">
</section>

<main class="flex items-center justify-center min-h-screen -mt-16 overscroll-y-none" id="body">
	<div class="mx-auto w-fit mt-20 grid grid-cols-2 justify-between rounded-2xl xl:grid-cols-2 bg-white/60 backdrop-blur-md shadow-2xl min-h-[31rem]">
		<div class="flex flex-col gap-4 p-8 justify-between">
			<a href="/">
				<img alt="" class="w-32" src="{logo}">
			</a>
			<p class="select-none w-fit font-bold bg-gradient-to-l from-0%
			from-amber-600 to-yellow-600 bg-clip-text text-transparent">
				Let's venture <br>Into the world of agriculture together
			</p>
			<img alt="logo" class="h-64 w-full place-items-center" src={signInBgArt}>
			<p class="pt-4 text-xs font-light text-amber-800 text-start justify-end">
				2023 &copy; Agri-Inn. All rights reserved.
			</p>
		</div>
		<div class="rounded-r-2xl p-8 flex flex-col bg-yellow-50/50 w-full h-full justify-between">
			<div class="flex gap-2 justify-end items-center align-middle">
				<h1 class="text-2xl font-black text-yellow-950">
					Sign Up
				</h1>
				<img alt="" class="h-7 w-7" src={sign_up_logo}/>
			</div>


			{#key pageChange}
				<div in:fade={{ duration: 200, delay: 500 }}>
					{#if (pageChange === 0)}
						<div class="flex flex-col">
							<div class="mb-1">
								<label for="email" class="block font-bold text-gray-600 ml-4">Email Address</label>
								<label in:fade for="email" class="block font-light text-xs text-gray-600 ml-4">The Email
									Address
									You
									Want to
									Register</label>
								<input required on:input={validateEmail} bind:value={email}
									   type="email" id="email" name="email"
									   class="mt-2 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none
                       focus:shadow-md block w-full py-2.5 px-4 transition-all duration-300 antialiased">
							</div>

							<div class="mb-1">
								<label for="password" class="block font-bold text-gray-600 ml-4">New Password</label>
								<label for="email" class="block font-light text-xs text-gray-600 ml-4">
									Choose a password of 8 characters

								</label>

								<input required on:input={validatePassword} bind:value={password}
									   type="password" id="password" name="password"
									   class="mt-2 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none
                       focus:shadow-md block w-full py-2.5 px-4 transition-all duration-300 antialiased">
							</div>

							<div class="mb-1">
								<label for="confirm_password" class="block font-bold text-gray-600 ml-4">Confirm
									Password</label>
								<label for="email" class="block font-light text-xs text-gray-600 ml-4">Enter the
									Password
									Again</label>
								<input required on:input={crossCheckPassword} bind:value={confirm_password}
									   type="password" id="confirm_password" name="confirm_password"
									   class="mt-2 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none
                       focus:shadow-md block w-full py-2.5 px-4 transition-all duration-300 antialiased">
							</div>

							<div class="mx-auto flex justify-end items-end mt-4" id="submit_button">
								<button on:click={()=>{pageChange++;}}
										class="w-fit px-6 bg-amber-700 font-bold text-white py-2 rounded-full hover:bg-amber-900 focus:outline-none transition-all duration-300">
									Next
								</button>
							</div>
						</div>
					{:else if (pageChange === 1)}
						<div class="flex flex-col gap-1 ">
							<div class="mb-1">
								<label for="full_name" class="block font-bold text-gray-600 ml-4">Full Name</label>
								<label for="full_name" class="block font-light text-xs text-gray-600 ml-4">
									Your Full Name as it Appears on Your ID Card
								</label>
								<input required bind:value={full_name}
									   type="text" id="full_name" name="full_name"
									   class="mt-2 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none
                       focus:shadow-md block w-full py-2.5 px-4 transition-all duration-300 antialiased">
							</div>

							<div class="mb-1">
								<label for="email" class="block font-bold text-gray-600 ml-4">Choose Your
									Username</label>
								<label for="email" class="block font-light text-xs text-gray-600 ml-4">
									The unique username you will use to login
								</label>
								<input required on:input={validateUsername} bind:value={user_name}
									   type="email" id="email" name="email"
									   class="mt-2 font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full outline-none
                       focus:shadow-md block w-full py-2.5 px-4 transition-all duration-300 antialiased">
							</div>

							<div class="flex justify-between align-middle items-center mt-6 ">
								<button type="button"
										class="w-fit px-8 font-bold py-2 rounded-full hover:bg-amber-300 text-amber-900 focus:outline-none transition-all duration-300"
										on:click={()=>{pageChange--;}}>
									Back
								</button>
								<button on:click={()=>{pageChange++;}}
										class="w-fit px-6 bg-amber-700 font-bold text-white py-2 rounded-full hover:bg-amber-900 focus:outline-none transition-all duration-300">
									Next
								</button>
							</div>
						</div>
					{:else if (pageChange === 2)}
						<form on:submit={handleSubmit} class="flex flex-col gap-1">
							<!--							Choose Profile Pic-->
							<h1>Choose profile Pic</h1>
							<div class="flex justify-between items-center align-middle">
								<button type="button"
										class="w-fit px-8 font-bold py-2 rounded-full hover:bg-amber-300 text-amber-900 focus:outline-none transition-all duration-300"
										on:click={()=>{pageChange--;}}>
									Back
								</button>

								<button type="submit" name="submit"
										class="w-fit px-6 bg-amber-700 font-bold text-white py-2 rounded-full hover:bg-amber-900 focus:outline-none transition-all duration-300">
									Get Started
								</button>
							</div>

						</form>
					{/if}
				</div>
			{/key}


			<h1 class="text-zinc-500 text-sm text-end">
				Need Help Signing Up?
				<a class="font-semibold hover:underline transition-all duration-300 text-yellow-950"
				   href="/">
					Contact Us
				</a>
			</h1>

		</div>

	</div>
</main>