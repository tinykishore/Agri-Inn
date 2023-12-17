<script lang="ts">
    import back_icon from "$lib/assets/icons/all-back-icon.svg";
    import search_icon from "$lib/assets/icons/landing-page-search-icon.svg";
    import {search_navigation} from "$lib/stores/DynamicNavigation";
    import {isUserCacheValid} from "$lib/client/utility";
    import UserCache from "$lib/stores/UserCache";

    let query = "";

    async function search() {
        if (query.length > 0) {
            const response = await fetch("/API/v1/SearchAllAPI", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: query
                })
            });

            const search_results = await response.json();

            search_navigation.update(() => {
                return {
                    search_results: search_results,
                    query: query
                }
            });

            console.log(search_results)
        }
    }

    $: {
        if (query.length == 0) {
            search_navigation.update(() => {
                return {
                    search_results: [],
                    query: ""
                }
            });
        }
    }

    let username: string | undefined;
    let full_name: string | undefined;
    let profile_picture: string | undefined;
    let UserCacheValid = isUserCacheValid();

    UserCache.subscribe((value) => {
        username = value.username;
        full_name = value.full_name;
        profile_picture = value.profile_picture;
    });

</script>
<div class="grid grid-cols-3 justify-center items-center align-middle">
	<div class="flex justify-start gap-2">
		<a href="/"
		   class="px-3 py-2 flex items-center text-sm align-middle rounded-full font-bold border border-yellow-800
		   hover:bg-amber-300 text-yellow-950 transition-all duration-300">
				<span class="block h-5 w-5">
					<img src={back_icon} alt="search_icon">
				</span>
			Back
		</a>

	</div>


	<div class="px-3 py-1 w-full flex items-center text-sm gap-2 align-middle rounded-full font-bold border
	border-yellow-800 hover:bg-amber-200 text-yellow-950 transition-all duration-300">
		<span class="inline-block h-5 w-5 translate-y-0.5">
			<img alt="search_icon" src={search_icon}>
		</span>

		<input bind:value={query} on:input={search} type="text"
			   class="bg-transparent  focus:ring-0 font-mono font-light w-full placeholder-yellow-500 border-0 my-0 py-0"
			   placeholder="Type anything to search"/>

		<button class="rounded-full font-bold text-yellow-950 pr-2 py-1">
			Search
		</button>
	</div>

	{#if !UserCacheValid}
		<div class="flex justify-end gap-2 text-sm">
			<a href="/sign-in"
			   class="px-6 py-2 rounded-full border-0 font-medium text-yellow-950  hover:bg-yellow-300 transition-all
		   duration-300">
				Sign In
			</a>
			<a href="/sign-up"
			   class=" px-6 py-2 rounded-full font-bold border border-yellow-800 hover:bg-amber-300 text-yellow-950
		   transition-all duration-300">
				Get Started with us
			</a>
		</div>
	{:else}
		<div class="flex justify-end gap-2 text-sm">
		<a href="/{username}"
		   class="flex gap-4 rounded-full w-fit align-middle border-yellow-800/20 border justify-end items-center font-semibold text-yellow-950  hover:bg-yellow-300 hover:border-yellow-800 transition-all duration-300">
			<h1 class=" pl-4 font-bold py-2">{full_name?.split(" ")[0]}</h1>
			<img alt="" class="h-9 w-9 rounded-full" src={profile_picture}>
		</a>
		</div>

	{/if}



</div>