<script lang="ts">
    import {isValidURL, makeURL} from "$lib/client/utility";

    export let sender_avatar: string;
    // export let timestamp: string;
    // export let receiver: string;
    export let message: string;
    export let is_sender_me: boolean;

</script>

{#if is_sender_me}
    <main class="ml-20 w-96 gap-2 flex justify-end place-self-end items-end align-middle">
        {#if isValidURL(message)}
            <a href={makeURL(message)} class="min-w-fit max-w-[80%] bg-amber-950 shadow-xl rounded-2xl px-4 py-2
			text-white hover:underline hover:bg-amber-800 transition-all duration-300">
                {message}
            </a>
        {:else}
            <h1 class="min-w-fit max-w-[80%] whitespace-pre-line bg-amber-950 shadow-xl hover:bg-amber-800
            rounded-2xl px-4 py-2 text-white transition-all duration-300">
                {message}
            </h1>
        {/if}
        <img class="w-8 h-8 rounded-full" src={sender_avatar} alt=""/>
    </main>
{:else }
    <main class="mr-20 w-96 gap-2 flex justify-start place-self-end items-end align-middle">
        <img class="w-8 h-8 rounded-full" src={sender_avatar} alt=""/>
        {#if isValidURL(message)}
            <a href={makeURL(message)} class="min-w-fit max-w-[80%] bg-zinc-300 shadow-xl rounded-2xl
            px-4 py-2 hover:underline transition-all duration-300">
                {message}
            </a>
        {:else}
            <h1 class="min-w-fit max-w-[80%] whitespace-pre-line bg-zinc-300 shadow-xl rounded-2xl px-4 py-2
            transition-all duration-300">
                {message}
            </h1>
        {/if}
    </main>
{/if}







