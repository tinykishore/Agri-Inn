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

<main class="my-20 mx-32">
	<div class="grid grid-cols-2 gap-6 h-full">
		<div class=" flex flex-col gap-6 rounded-sm p-4">
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

			<section class="flex flex-col gap-2">
				<h1 class="text-4xl font-black">System Architecture</h1>
				<div class="grid gap-x-4 grid-cols-2">
					<a href="https://kit.svelte.dev/"
					   class="flex gap-2 px-4 py-2 justify-start align-middle
					   items-center w-fit">
						<img class="w-[50%]" src={svelte} alt=""/>
					</a>
					<a href="https://kit.svelte.dev/"
					   class="flex gap-2 px-4 py-2 justify-start align-middle
					   items-center w-fit">
						<img class="w-[50%]" src={MongoDB} alt=""/>
					</a>
					<a href="https://kit.svelte.dev/"
					   class="flex gap-2 px-4 py-2 justify-start align-middle
					   items-center w-fit">
						<img class="w-[50%]" src={supabase} alt="NextJS"/>
					</a>
					<a href="https://kit.svelte.dev/"
					   class="flex gap-2 px-4 py-2 justify-start align-middle
					   items-center w-fit">
						<img class="w-[50%]" src={vercel} alt=""/>
					</a>
					<a href="https://kit.svelte.dev/"
					   class="flex gap-2 px-4 py-2 justify-start align-middle
					   items-center w-fit">
						<img class="w-40" src={tailwindcss} alt=""/>
					</a>
					<a href="https://kit.svelte.dev/"
					   class="flex gap-2 px-4 py-2 justify-start align-middle
					   items-center w-fit">
						<img class="h-8" src="https://wiki.postgresql.org/images/a/a4/PostgreSQL_logo.3colors.svg" alt="NextJS"/>
						<h1 class=" text-xl font-bold text-zinc-700">PostgreSQL</h1>
					</a>
					<a href="https://kit.svelte.dev/"
					   class="flex gap-2 px-4 py-2 justify-start align-middle
					   items-center w-fit">
						<img class="w-44 -translate-x-4 -translate-y-4" src={tensorflow} alt="NextJS"/>
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
							<h1 class=" col-span-2 text-xl text-zinc-600">Loading...</h1>
						{/if}
					</div>
				{/key}
			</section>
		</div>
	</div>
</main>