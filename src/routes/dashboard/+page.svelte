<script lang="ts">
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";
    import {onMount} from "svelte";
    import logo from "$lib/assets/icons/logo.svg";
    import right_arrow from "$lib/assets/icons/right_arrow.svg";
    import UserCache from "$lib/stores/UserCache";
    import forum_bg from "$lib/assets/images/forum-bg.png";
    import 'flowbite';

    DynamicNavigation.set(DashboardNavigation);

    let userCache: TypeUserCache;
    UserCache.subscribe(value => {
        userCache = value;
    })

	onMount(async () => {

	})
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Dashboard">
</svelte:head>

<section class="fixed bg-fixed top-0 left-0 h-screen w-screen -z-50">
	<img alt="sign-in-bg" class="w-full h-full bg-fixed object-cover" src="{forum_bg}">
</section>

<main class="my-20 mx-32">
	<div class="grid-cols-3 grid gap-4 mt-36">

		<div class="flex flex-col">
			<h1> Some panel </h1>
		</div>

		<div id="user_info"
			 class="bg-white/60 backdrop-blur-2xl  rounded-2xl p-4 align-middle items-center flex flex-col">
			<div class="flex flex-col gap-1 justify-center align-middle items-center -translate-y-16 ">
				<img class="rounded-full  w-28 h-28 border-8 border-white/60 backdrop-blur-2x"
					 src={userCache.profile_picture} alt="profile_picture">
				<h1 class=" text-2xl font-black w-full  text-amber-950">Welcome, {userCache.full_name}</h1>
				<h1 class=" font-semibold font-mono">{userCache.email}</h1>
				<h1>{userCache.user_role}</h1>
			</div>
		</div>

		<div class="bg-white/30 backdrop-blur-2xl p-4 rounded-2xl flex flex-col gap-2">
			<div class="flex flex-col gap-1">
				<h1 class="text-xl font-bold antialiased text-end text-amber-900">Quick Links</h1>
				<h1 class="mb-2 text-sm font-bold antialiased text-end bg-gradient-to-bl from-amber-900 to-amber-700 text-transparent bg-clip-text">
					Suggested From Your Activity
				</h1>
			</div>

			<div class="grid grid-cols-3 justify-around gap-4">
				<a class="rounded-2xl bg-zinc-50 p-4" href="/farms">
					<h1>icon</h1>

					<h1 class="text-xl font-bold antialiased text-amber-900">Farms</h1>
					<h1 class="text-sm antialiased text-amber-900">Manage your farms</h1>
				</a>

				<a class="rounded-2xl bg-zinc-50 p-4" href="/forum">
					<h1>icon</h1>

					<h1 class="text-xl font-bold antialiased text-amber-900">Forum</h1>
					<h1 class="text-sm antialiased text-amber-900">Join the community</h1>
				</a>

				<a class="rounded-2xl bg-zinc-50 p-4" href="/events">
					<h1>icon</h1>
					<h1 class="text-xl font-bold antialiased text-amber-900">Event</h1>
					<h1 class="text-sm antialiased text-amber-900">Join the event</h1>
				</a>
			</div>

			<!--			<a class="rounded-2xl bg-zinc-50 p-4" href="/farms">-->
			<!--				<h1 class="text-xl font-bold antialiased text-amber-900">Farms</h1>-->
			<!--				<h1 class="text-sm font-bold antialiased text-amber-900">Manage your farms</h1>-->
			<!--			</a>-->

			<!--			{#if userCache?.user_role === USER_ROLE.OWNER}-->
			<!--				<a class="rounded-2xl bg-zinc-50 p-4" href="/health-track">-->
			<!--					<h1 class="text-xl font-bold antialiased text-amber-900">Health Track</h1>-->
			<!--					<h1 class="text-sm font-bold antialiased text-amber-900">Track your livestock health</h1>-->
			<!--				</a>-->
			<!--			{/if}-->

			<!--			<a class="rounded-2xl bg-zinc-50 p-4" href="/forum">-->
			<!--				<h1 class="text-xl font-bold antialiased text-amber-900">Forum</h1>-->
			<!--				<h1 class="text-sm font-bold antialiased text-amber-900">Join the community</h1>-->
			<!--			</a>-->

			<!--			<a class="rounded-2xl bg-zinc-50 p-4" href="/marketplace">-->
			<!--				<h1 class="text-xl font-bold antialiased text-amber-900">Marketplace</h1>-->
			<!--				<h1 class="text-sm font-bold antialiased text-amber-900">Buy and sell your crops</h1>-->
			<!--			</a>-->

			<!--			<a class="rounded-2xl bg-zinc-50 p-4" href="/news">-->
			<!--				<h1 class="text-xl font-bold antialiased text-amber-900">News</h1>-->
			<!--				<h1 class="text-sm font-bold antialiased text-amber-900">Stay updated with latest livestock news</h1>-->
			<!--			</a>-->

		</div>

	</div>


	<div id="default-carousel" class="relative w-full" data-carousel="slide">
		<!-- Carousel wrapper -->
		<div class="relative h-56 overflow-hidden rounded-lg md:h-96">
			<!-- Item 1 -->
			<div class="hidden duration-700 ease-in-out" data-carousel-item>
				<img src="/src/lib/assets/images/about_bg.jpg"
					 class="object-cover absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
					 alt="...">
			</div>
			<!-- Item 2 -->
			<div class="hidden duration-700 ease-in-out" data-carousel-item>
				<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Lvm.svg/400px-Lvm.svg.png"
					 class="object-cover absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
					 alt="...">
			</div>
			<!-- Item 3 -->
			<div class="hidden duration-700 ease-in-out" data-carousel-item>
				<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Lvm.svg/400px-Lvm.svg.png"
					 class="object-cover absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
					 alt="...">
			</div>
			<!-- Item 4 -->
			<div class="hidden duration-700 ease-in-out" data-carousel-item>
				<img src="https://assets.site-static.com/userFiles/1681/image/uploads/agent-1/buy-sell-land.jpg"
					 class="object-cover absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
					 alt="...">
			</div>
			<!-- Item 5 -->
			<div class="hidden duration-700 ease-in-out" data-carousel-item>
				<img src="https://assets.site-static.com/userFiles/1681/image/uploads/agent-1/buy-sell-land.jpg"
					 class="object-cover absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
					 alt="...">
			</div>
		</div>
		<!-- Slider indicators -->
		<div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
			<button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1"
					data-carousel-slide-to="0"></button>
			<button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2"
					data-carousel-slide-to="1"></button>
			<button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3"
					data-carousel-slide-to="2"></button>
			<button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4"
					data-carousel-slide-to="3"></button>
			<button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5"
					data-carousel-slide-to="4"></button>
		</div>
		<!-- Slider controls -->
		<button type="button"
				class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
				data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
				 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					  d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
		</button>
		<button type="button"
				class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
				data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
				 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					  d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
		</button>
	</div>


	<h1 class="text-3xl font-bold mt-12 text-amber-950">Explore
		<span class="ml-2 mb-1 inline-block items-center align-middle">
			<img class=" w-32" src={logo} alt="">
		</span>
	</h1>

	<div class="w-full flex gap-4 justify-around items-center">
		<div class="flex flex-col gap-2">
			<a href="/events"
			   class="flex justify-between gap-2 rounded-xl align-middle items-center bg-white/50 hover:bg-white hover:scale-105 px-4 py-2 transition duration-300">
				<h1>Events</h1>
				<img src="{right_arrow}" alt=""/>
			</a>
			<h1>
				Somrthing
			</h1>
			<h1>
				Somrthing
			</h1>
		</div>


		<a href="/farms"
		   class="p-4 rounded-xl bg-white/40 hover:bg-white hover:scale-105 transition duration-300">Farms</a>
		<a href="/health-track"
		   class="p-4 rounded-xl bg-white/40 hover:bg-white hover:scale-105 transition duration-300">Health Track</a>
		<a href="/news"
		   class="p-4 rounded-xl bg-white/40 hover:bg-white hover:scale-105 transition duration-300">News</a>
		<a href="/marketplace"
		   class="p-4 rounded-xl bg-white/40 hover:bg-white hover:scale-105 transition duration-300">Marketplace</a>
		<a href="/instalments"
		   class="p-4 rounded-xl bg-white/40 hover:bg-white hover:scale-105 transition duration-300">Installments</a>

	</div>


</main>
