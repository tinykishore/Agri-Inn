<script lang="ts">
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";
    import {onMount} from "svelte";
    import UserCache from "$lib/stores/UserCache";
    import forum_bg from "$lib/assets/images/forum-bg.png";
    import 'flowbite';
    import farm_icon from "$lib/assets/icons/farm.svg";
    import event_icon from "$lib/assets/icons/event.svg";
    import discussion_icon from "$lib/assets/icons/discussion.svg";
    import oneImg from "$lib/assets/images/1.png";
    import twoImg from "$lib/assets/images/2.png";
    import threeImg from "$lib/assets/images/3.png";
    import marketplace_img from "$lib/assets/images/marketplace-dashbord.png";
    import health_cow from "$lib/assets/images/dashboard_health.jpg";
    import news_img from "$lib/assets/images/news_ill.png";
    import {formatDateTime, USER_ROLE} from "$lib/client/utility";


    DynamicNavigation.set(DashboardNavigation);

    let userCache: TypeUserCache;
    UserCache.subscribe(value => {
        userCache = value;
    })

    let res: any;

	onMount(async () => {
        // API for latest event
        const response = await fetch('/API/v1/GetLatestEvent')
        res = await response.json();
        res = res[0]
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
	<div class="grid-cols-3 grid gap-4 mt-36 mb-8">

		<div class="bg-white/30 backdrop-blur-2xl p-4 rounded-2xl flex flex-col gap-2">
			<div class="flex flex-col gap-1">
				<h1 class="text-xl font-bold antialiased text-amber-900">Upcomming Events</h1>
				<h1 class="mb-2 text-sm font-bold antialiased bg-gradient-to-bl from-amber-900 to-amber-700 text-transparent bg-clip-text">
					Latest events ongoing!
				</h1>
			</div>


			{#if (res)}
				<div class="rounded-2xl flex bg-zinc-50 h-full align-middle items-center p-4 hover:bg-amber-300 duration-300 transition-all">
					<a href="/events/{res._id}">
						<h1 class="text-xl font-bold antialiased text-amber-900">{res.event_name}</h1>
						<h1 class="text-sm antialiased text-amber-900">{res.description}</h1>
						<h1 class="text-sm font-black antialiased mt-2 text-amber-900">Event on:
							<span class="px-3 py-1 text-white font-bold text-sm bg-amber-900 rounded-full">
								{formatDateTime(res.event_date)}</span></h1>
					</a>
				</div>
			{:else}
				<h1 class="text-xl font-bold antialiased text-amber-900">No events</h1>
			{/if}


		</div>

		<div id="user_info"
			 class="bg-white/60 backdrop-blur-2xl  rounded-2xl p-4 align-middle items-center flex flex-col">
			<div class="flex flex-col gap-1 justify-center align-middle items-center -translate-y-16 ">
				<img class="rounded-full  w-28 h-28 border-8 border-white/60 backdrop-blur-2x"
					 src={userCache.profile_picture} alt="profile_picture">
				<h1 class=" text-2xl font-black w-full  text-amber-950">Welcome, {userCache.full_name}</h1>
				<h1 class=" font-semibold font-mono">{userCache.email}</h1>
				{#if (userCache.user_role === USER_ROLE.USER)}
					<h1 class=" font-semibold font-mono">Agri-Inn User</h1>
				{:else if (userCache.user_role === USER_ROLE.OWNER)}
					<h1 class=" font-semibold font-mono">Farm Owner</h1>
				{:else if (userCache.user_role === USER_ROLE.ADMIN)}
					<h1 class=" font-semibold font-mono">Agri-Inn Admin</h1>
				{/if}
			</div>
		</div>

		<div class="bg-white/30 backdrop-blur-2xl p-4 rounded-2xl flex flex-col gap-2">
			<div class="flex flex-col gap-1">
				<h1 class="text-xl font-bold antialiased text-end text-amber-900">Quick Links</h1>
				<h1 class="mb-2 text-sm font-bold antialiased text-end bg-gradient-to-bl from-amber-900 to-amber-700 text-transparent bg-clip-text">
					Frequently Visited Pages
				</h1>
			</div>

			<div class="grid grid-cols-3 justify-around gap-4">
				<a class="rounded-2xl bg-zinc-50 p-4 hover:bg-amber-300 duration-300 transition-all" href="/farms">
					<img class="h-6 mb-2" src={farm_icon} alt=""/>
					<h1 class="text-xl font-bold antialiased text-amber-900">Farms</h1>
					<h1 class="text-sm antialiased text-amber-900">Manage your farms</h1>
				</a>

				<a class="rounded-2xl bg-zinc-50 p-4 hover:bg-amber-300 duration-300 transition-all" href="/forum">
					<img class="h-6 mb-2" src={discussion_icon} alt=""/>

					<h1 class="text-xl font-bold antialiased text-amber-900">Forum</h1>
					<h1 class="text-sm antialiased text-amber-900">Join the community</h1>
				</a>

				<a class="rounded-2xl bg-zinc-50 p-4 hover:bg-amber-300 duration-300 transition-all" href="/events">
					<img class="h-6 mb-2" src={event_icon} alt=""/>
					<h1 class="text-xl font-bold antialiased text-amber-900">Event</h1>
					<h1 class="text-sm antialiased text-amber-900">Join the event</h1>
				</a>
			</div>

		</div>
	</div>

	<div class="mx-24 flex gap-2 rounded-2xl bg-orange-200 mb-8">
		<div class="flex gap-1 ">
			<img class="h-60 rounded-l-2xl" src={oneImg} alt=""/>
			<img class="h-60 " src={twoImg} alt=""/>
			<img class="h-60" src={threeImg} alt=""/>
		</div>
		<div class="flex flex-col gap-2 p-4 w-fit h-full">
			<h1 class="text-2xl font-black text-amber-950 antialiased">2023 Contribution of Agri-Inn</h1>
			<h1 class="font-semibold">Explore this year’s most generous cities, unforgettable stories around the
				globe</h1>
			<div class="text-white bg-amber-700 font-medium w-fit rounded-2xl px-4 py-1 mt-8">
				See more <span class="text-white font-bold">→</span>
			</div>
		</div>
	</div>

	<div class=" ml-3 grid grid-cols-2 gap-4 w-full mb-8">
		<div class="flex gap-3 bg-white/30 justify-between hover:bg-amber-200 transition-all duration-300 rounded-2xl p-6">
			<div class="h-full flex flex-col justify-between">
				<h1 class="text-3xl text-amber-900 font-black ">Visit our Marketplace</h1>
				<h1 class="text-xl text-amber-900 font-bold ">Fresh products from our farms</h1>
				<a href="/marketplace"
				   class="my-auto px-4 py-1 font-bold text-white bg-amber-700 hover:bg-amber-950
				   transition-all duration-300  w-fit rounded-full">
					Go to Marketplace
					<span>
						<svg class="inline-block w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg"
							 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
							 stroke-linecap="round" stroke-linejoin="round">
							<path d="M5 12h13M12 5l7 7-7 7"></path>
						</svg>
					</span>
				</a>
			</div>
			<img class="w-52 " src={marketplace_img} alt=""/>
		</div>

		<div class="flex gap-3 bg-white/30 justify-between hover:bg-amber-200 transition-all duration-300 rounded-2xl p-6">
			<div class="h-full flex flex-col justify-between">
				<h1 class="text-3xl text-amber-900 font-black ">Stay Updated</h1>
				<h1 class="text-xl text-amber-900 font-bold ">Visit our news section, to stay updated</h1>
				<a href="/news"
				   class="my-auto px-4 py-1 font-bold text-white bg-amber-700 hover:bg-amber-950
				   transition-all duration-300  w-fit rounded-full">
					Know What's Happening
					<span>
						<svg class="inline-block w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg"
							 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
							 stroke-linecap="round" stroke-linejoin="round">
							<path d="M5 12h13M12 5l7 7-7 7"></path>
						</svg>
					</span>
				</a>
			</div>
			<img class="w-52 " src={news_img} alt=""/>
		</div>


	</div>

	{#if userCache.user_role === USER_ROLE.OWNER}
	<div class="mx-24 flex gap-2 rounded-2xl bg-orange-200 mb-8">
		<div class="flex gap-1 justify-between w-full">
			<div class="flex flex-col gap-2 p-4 w-fit h-full my-auto">
				<div class="px-4 py-1 rounded-full bg-blue-800  text-blue-200 mb-12 font-bold w-fit">For Farm Owners</div>
				<div class="flex flex-col gap-2 justify-between">
					<h1 class="text-2xl font-black text-amber-950 antialiased">Keep your livestock disease free</h1>
					<h1 class="font-semibold">Track your livestock health and get notified when they are sick</h1>
					<a href="/health-track" class=" mt-6 px-4 py-1 font-bold text-white bg-amber-700 hover:bg-amber-950
				   transition-all duration-300  w-fit rounded-full">
						Go to Health Care Panel <span class="text-white font-bold">→</span>
					</a>
				</div>
			</div>
			<img class=" w-96 rounded-r-2xl" src={health_cow} alt=""/>
		</div>
	</div>
	{/if}


</main>
