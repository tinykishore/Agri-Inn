<script lang="ts">
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import AboutNavigation from "$lib/components/dynamicNavigations/AboutNavigation.svelte";
    import logo from "$lib/assets/icons/logo.svg";
    import {onMount} from "svelte";
    import Persons from "./Persons.svelte";
    import {fade} from "svelte/transition";
    import svelte from "$lib/assets/icons/svelte-horizontal.svg";
    import MongoDB from "$lib/assets/icons/MongoDB_Fores-Green.svg";
    import supabase from "$lib/assets/icons/supabase-logo-wordmark--light.svg";
    import tailwindcss from "$lib/assets/icons/tailwindcss-logotype.svg";
    import vercel from "$lib/assets/icons/vercel-logotype-dark.svg";
    import tensorflow from "$lib/assets/icons/TF_FullColor_Horizontal.svg";
    import about_bg from "$lib/assets/images/about_bg.jpg";

    DynamicNavigation.set(AboutNavigation);

    const section = {
        introduction: "Discover the future of livestock farming with our innovative platform, “Agri-Inn”. Tailored for farm owners, enthusiasts, our website streamlines operations, facilitates livestock sales and fosters community collaboration. Whether managing farms, participating in forums or staying updated on industry news and events, our platform seamlessly connects users. Join us in redefining agriculture — a space where technology harmonizes with tradition to build a sustainable and closely knit farming community.",
    }

    let contributors: any;

    onMount(async () => {
        // Get All the contributors from the GitHub API
        const response = await fetch("https://api.github.com/repos/tinykishore/Agri-Inn/contributors")
        contributors = await response.json();
    });

</script>

<svelte:head>
	<title>About Us</title>
	<meta name="description" content="About Us">
</svelte:head>

<section class="fixed bg-fixed top-0 left-0 h-screen w-screen -z-50">
	<img alt="sign-in-bg" class="w-full h-full bg-fixed object-cover" src="{about_bg}">
</section>

<main class="my-20 mx-32">
	<div class="grid grid-cols-2 gap-6 h-full">
		<div class="flex flex-col gap-6 rounded-sm p-4 justify-between">
			<section class="flex flex-col gap-2">
				<h1 class="text-4xl font-black">About
					<span>
						<img alt="" class="inline-block w-36 mb-1 ml-2" src={logo}/>
					</span>
				</h1>
				<h1 class="text-zinc-700 text-sm">
					{section.introduction}
				</h1>
			</section>

			<section class="flex flex-col gap-2 mt-4">
				<h1 class="text-4xl font-black">System Architecture</h1>
				<div class="grid grid-cols-3">
					<a target="_blank" href="https://kit.svelte.dev/"
					   class="flex gap-2 px-4 py-2 justify-start align-middle
					   items-center w-fit">
						<img class="w-[60%]" src={svelte} alt=""/>
					</a>
					<a target="_blank" href="https://www.mongodb.com/"
					   class="flex gap-2 px-4 py-2 justify-start align-middle
					   items-center w-fit">
						<img class="w-[60%]" src={MongoDB} alt=""/>
					</a>
					<a target="_blank" href="https://supabase.com/"
					   class="flex gap-2 px-4 py-2 justify-start align-middle
					   items-center w-fit">
						<img class="w-[60%]" src={supabase} alt="NextJS"/>
					</a>
					<a target="_blank" href="https://vercel.com/"
					   class="flex gap-2 px-4 py-2 justify-start align-middle
					   items-center w-fit">
						<img class="w-[50%]" src={vercel} alt=""/>
					</a>
					<a target="_blank" href="https://tailwindcss.com/"
					   class="flex gap-2 px-4 py-2 justify-start align-middle
					   items-center w-fit">
						<img class="w-32" src={tailwindcss} alt=""/>
					</a>
					<a target="_blank" href="https://www.postgresql.org/"
					   class="flex gap-2 px-4 py-2 justify-start align-middle
					   items-center w-fit">
						<img class="h-6" src="https://wiki.postgresql.org/images/a/a4/PostgreSQL_logo.3colors.svg"
							 alt=""/>
						<h1 class=" font-bold text-zinc-700">PostgreSQL</h1>
					</a>
					<a target="_blank" href="https://www.tensorflow.org"
					   class="flex gap-2 px-4 py-2 justify-start align-middle
					   items-center w-fit">
						<img class="w-32" src={tensorflow} alt=""/>
					</a>
				</div>

			</section>
		</div>

		<div class=" flex flex-col gap-6 rounded-sm p-4 row-span-2">
			<section class="flex flex-col gap-2 text-center">
				<h1 class="text-xl text-zinc-600 mb-4">Made with 💖 by</h1>
				{#key contributors}
					<div class="grid grid-cols-2 gap-4" in:fade>
						{#if contributors}
							{#each contributors as contributor}
								<Persons contributor={contributor}/>
							{/each}
						{:else}
							{#each Array(6) as _, i}
								<div class="flex gap-4 rounded-2xl p-3 animate-pulse w-full
			hover:drop-shadow-sm transition-all duration-300 items-center justify-start align-middle">
									<svg class="w-16 h-16 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
										<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
									</svg>
									<div class="flex-col flex w-full justify-start align-middle items-start">
										<div class="flex-col flex w-full justify-start align-middle items-start">
											<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
										</div>
										<div class="flex-col flex w-full justify-start align-middle items-start">
											<div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
										</div>
									</div>
								</div>
							{/each}
						{/if}
					</div>
				{/key}
			</section>
		</div>
	</div>
</main>