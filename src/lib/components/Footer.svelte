<script>
    import icon from "$lib/assets/icons/svelte-horizontal.svg";
</script>
<footer class=" fixed bottom-0 w-full md:flex mx-auto py-2 px-32 z-50
justify-between sm:justify-between align-middle items-center text-sm text-zinc-600 shadow-sm
rounded-t-lg bg-gradient-to-l from-yellow-100 to-amber-50">
    <div id="left-side" class="flex flex-row gap-2 gap-x-6 flex-wrap">
        <p class="select-none cursor-default">&copy; 2023 Agri-Inn, Inc.</p>
        <a href="/" class="hover:text-amber-700 hover:underline">Terms</a>
        <a href="/" class="hover:text-amber-700 hover:underline">Sitemap</a>
        <a href="/" class="hover:text-amber-700 hover:underline">Privacy</a>
        <a href="/" class="hover:text-amber-700 hover:underline">Your Privacy Choices</a>

    </div>

    <div class="text-gray-900 font-bold flex-row flex gap-x-6">
        <a href="/" class="hover:underline">English (US)</a>
        <a href="/" class="hover:underline">Support and Resource</a>
        <a href="https://kit.svelte.dev/"
           class="select-none flex gap-1 items-center justify-start align-middle font-normal text-zinc-500">
            Made with
            <span>
                <img class="w-20" src={icon} alt=""/>
            </span>
        </a>
    </div>
</footer>
