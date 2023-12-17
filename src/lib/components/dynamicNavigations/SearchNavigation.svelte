<script lang="ts">
    import back_icon from "$lib/assets/icons/all-back-icon.svg";
    import category_icon from "$lib/assets/icons/search-page-category-icon.svg";
    import search_icon from "$lib/assets/icons/landing-page-search-icon.svg";
    import {search_navigation} from "$lib/stores/DynamicNavigation";

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
		<button class="px-6 py-2 flex items-center gap-2 align-middle text-sm rounded-full font-bold border
		border-yellow-800 hover:bg-amber-300 text-yellow-950 transition-all duration-300">
				<span class="block h-5 w-5">
					<img alt="category_icon" src={category_icon}>
				</span>
			Categories
		</button>
	</div>


	<div class="px-3 py-1 w-full flex items-center text-sm gap-2 align-middle rounded-full font-bold border
	border-yellow-800 hover:bg-amber-200 text-yellow-950 transition-all duration-300">
		<span class="inline-block h-5 w-5 translate-y-0.5">
			<img alt="search_icon" src={search_icon}>
		</span>

		<input bind:value={query} on:input={search} type="text"
			   class="bg-transparent font-mono focus:outline-none focus:border-0 outline-0 group-focus:outline-none outline-none font-light w-full placeholder-yellow-500 border-0 my-0 py-0"
			   placeholder="Type anything to search"/>

		<button class="rounded-full font-bold text-yellow-950 pr-2">
			Search
		</button>
	</div>


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
</div>