<script lang="ts">
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import AboutNavigation from "$lib/components/dynamicNavigations/AboutNavigation.svelte";
    import logo from "$lib/assets/icons/logo.svg";
    import {onMount} from "svelte";
    import Persons from "./Persons.svelte";
    import {fade} from "svelte/transition";

    DynamicNavigation.set(AboutNavigation);

    const section = {
        introduction: "Discover the future of livestock farming with our innovative platform, “Agri-Inn”. Tailored for farm owners, enthusiasts, our website streamlines operations, facilitates livestock sales and fosters community collaboration. Whether managing farms, participating in forums or staying updated on industry news and events, our platform seamlessly connects users. Join us in redefining agriculture — a space where technology harmonizes with tradition to build a sustainable and closely knit farming community.",
        motivation: "Our motivation arises from a deep commitment to revolutionize the landscape of livestock farming. We envision a platform that not only streamlines farm management but also nurtures a thriving community of farmers, enthusiasts and experts. By integrating technology, information and collaboration, we aim to empower individuals in the livestock industry, fostering sustainable practices and facilitating growth. Our goal is to bridge the gap between traditional farming and modern tools by creating a space where knowledge flows freely, commerce thrives and the future of livestock farming is shaped collectively. Join us on this transformative journey towards a more connected, informed, and sustainable agricultural future.",
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
				<h1 class="text-4xl font-black">Motivation</h1>
				<h1 class="text-zinc-700 text-sm">
					{section.motivation}
				</h1>
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