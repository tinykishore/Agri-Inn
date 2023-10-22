<script lang="ts">
    import BackgroundVideo from "$lib/components/BackgroundVideo.svelte";
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import LandingPageSteps from "$lib/components/LandingPageSteps.svelte";
    import LandingPageNavigation from "$lib/components/dynamicNavigations/LandingPageNavigation.svelte";

    DynamicNavigation.set(LandingPageNavigation)
</script>

<svelte:head>
	<title>Agri-Inn</title>
	<meta name="description" content="Agri-Inn is a platform that connects farmers and consumers.
	We are here to help you find the best products and services for your farm.">
	<meta name="robots" content="index, follow">
	<meta name="author" content="Agri-Inn">
	<meta name="url" content="https://agri-inn.com">
	<meta name="identifier-URL" content="https://agri-inn.com">
	<meta name="rating" content="general">
	<meta name="language" content="en">
	<meta name="viewport" content="width=device-width, initial-scale=0.9">
</svelte:head>

<main class="bg-cover bg-center bg-no-repeat min-h-screen">
	<div class="min-h-screen flex flex-col items-center justify-center mx-32 -translate-y-10">
		<h1 class="text-7xl font-bold text-white
			bg-gradient-to-l from-yellow-100 via-amber-200 to-yellow-100 bg-clip-text text-transparent pb-2">
			Agri-Inn to serve you
		</h1>

		<h2 class="text-4xl text-white drop-shadow-lg">Nurturing Life, Cultivating Growth</h2>

		<a class="px-6 py-2 rounded-full text-xl bg-amber-300 mt-10 text-yellow-950
					hover:bg-amber-400 hover:drop-shadow-xl transition duration-300 ease-in-out font-semibold"
		   href="/sign-up">Get Started</a>
	</div>
</main>

<main class="bg-amber-300">
	<section class="mx-32 py-6 px-4">
		<h1 class="text-xl font-bold text-yellow-600">
			What to expect
		</h1>

		<h1 class="text-4xl font-semibold mt-2 text-amber-900">
			Discover a new way of
			<span class="font-black bg-green-600 text-transparent bg-clip-text"> Farming </span>
			, a new way of
			<span class="font-black bg-green-600 text-transparent bg-clip-text"> Living </span>
			<br/>
			<span class="text-2xl text-yellow-700">
				Within just a few clicks, you can start your journey to a better life...
			</span>
		</h1>

		<LandingPageSteps/>
	</section>

</main>


<BackgroundVideo/>