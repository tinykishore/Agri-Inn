<script lang="ts">
    import search_icon from "$lib/assets/icons/landing-page-search-icon.svg";
</script>

<div class="grid grid-cols-3 justify-center items-center">
	<div class="flex justify-start gap-2">
		<a href="/search"
		   class="px-6 py-2 text-sm flex items-center gap-2 align-middle rounded-full font-bold border border-yellow-800 hover:bg-amber-300 text-yellow-950 transition-all duration-300"><span
				class="block h-4 w-4">
							<img src={search_icon} alt="search_icon"></span>
			Search Anywhere
		</a>
		<a href="/about"
		   class="px-6 py-2 text-sm rounded-full border-0 font-medium text-yellow-950 hover:bg-yellow-300 transition-all duration-300">About</a>

	</div>
	<div class="flex justify-center text-xl font-bold text-amber-800">
		<a href="/">Agri-Inn(LOGO)</a>

	</div>
	<div class="flex justify-end gap-2">
		<a href="/sign-in"
		   class="px-6 py-2 rounded-full text-sm border-0 font-semibold text-yellow-950  hover:bg-yellow-300 transition-all duration-300">
			Sign In
		</a>
		<a href="/sign-up"
		   class=" px-6 py-2 rounded-full text-sm font-bold border border-yellow-800 hover:bg-amber-300 text-yellow-950 transition-all duration-300">
			Get Started with Us
		</a>
	</div>
</div>