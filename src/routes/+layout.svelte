<script lang="ts">
    import '../tailwind.css';
    import {fade} from 'svelte/transition';
    import Footer from "$lib/components/Footer.svelte";
    import currentNavigation from "$lib/stores/currentNavigation";
    export let data;
</script>

<nav class="top-10 mx-24 rounded-full sticky px-2 py-2 drop-shadow-xl bg-gradient-to-l
from-yellow-100 via-amber-200 to-yellow-100 z-[10000] min-h-fit">
	{#key data.url}
		<div in:fade={{ duration: 200, delay: 200 }}>
			<svelte:component this={$currentNavigation} />
		</div>
	{/key}
</nav>

{#key data.url}
	<div in:fade={{ duration: 200, delay: 200 }} out:fade={{ duration: 200}}>
		<slot/>
	</div>
{/key}

<Footer/>