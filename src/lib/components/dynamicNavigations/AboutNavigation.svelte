<script lang="ts">
    import back_icon from "$lib/assets/icons/all-back-icon.svg";
    import search_icon from "$lib/assets/icons/landing-page-search-icon.svg";
</script>

<div class="grid grid-cols-3 justify-center items-center">
	<div class="flex justify-start gap-2">
		<a href="/"
		   class="px-3 py-2 text-sm flex items-center align-middle rounded-full font-bold border border-yellow-800 hover:bg-amber-300 text-yellow-950 transition-all duration-300"><span
				class="block h-5 w-5"><img alt="search_icon" src={back_icon}></span>
			Back
		</a>
		<a href="/search"
		   class="px-6 py-2 flex text-sm items-center gap-2 align-middle rounded-full font-bold border border-yellow-800 hover:bg-amber-300 text-yellow-950 transition-all duration-300"><span
				class="block h-5 w-5"><img src={search_icon} alt="search_icon"></span>
			Search Anywhere
		</a>
	</div>

	<div class="flex justify-center text-2xl font-bold text-amber-800">
		<h1>About us</h1>
	</div>

	<div class="flex justify-end gap-2 text-sm">
		<a href="/sign-in"
		   class="px-6 py-2 rounded-full border-0 font-medium text-yellow-950  hover:bg-yellow-300 transition-all duration-300">
			Sign In
		</a>
		<a href="/sign-up"
		   class=" px-6 py-2 rounded-full font-bold border border-yellow-800 hover:bg-amber-300 text-yellow-950 transition-all duration-300">
			Get Started with us
		</a>
	</div>
</div>