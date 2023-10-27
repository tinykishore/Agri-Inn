<script lang="ts">

    import {supabase} from "$lib/client/supabase";
    import {onMount} from "svelte";
    import UserCache from "$lib/stores/UserCache";

    let messages: any = [];
    let responseOK = false;
    let initTextLoad: number = 16;
    let userInfo: any = null;
    let newMessage: string = '';
    let sending: boolean = false;

    UserCache.subscribe((value) => {
        userInfo = value;
    });

    onMount(async () => {

        const resultList = await supabase
            .from('chat')
            .select('*')
            .order('created_at', {ascending: false})
            .limit(initTextLoad)
        messages = resultList.data;
        messages.reverse();
        responseOK = true;

        supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    schema: 'public', // Subscribes to the "public" schema in Postgres
                    event: '*',       // Listen to all changes
                },
                (payload) => {
                    messages = [payload.new, ...messages];
                    // @ts-ignore
                    messages = messages.filter((message: any) => message.id !== payload.old.id);
                    messages.sort((a: any, b: any) => {
                        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                    });
                }
            )
            .subscribe()

    });

    const sendMessage = async () => {

        if (!newMessage) return;

        sending = true;

        const {error} = await supabase.from('chat').insert([
            {
                body: newMessage,
                sender: userInfo.username,
                receiver: 'all'
            },
        ]);
        if (error) console.log(error);

        newMessage = '';
        sending = false;
        return;
    }

</script>

<main class="mt-16 ml-8">

    {#if !responseOK}
        <p>Loading...</p>
    {:else}
        {#each messages as message (message.id)}
            <div class="flex flex-col">
                <div class="flex flex-row">
                    {#if message.sender === userInfo.username}
                        <p class="font-bold text-blue-600">{message.sender}</p>
                    {:else}
                        <p class="font-bold">{message.sender}</p>
                    {/if}
                </div>
                <p>{message.body}</p>
            </div>
        {/each}
    {/if}

    <form on:submit|preventDefault={sendMessage}>

        <input id="message" name="message" bind:value={newMessage} autofocus autocomplete="off"
               placeholder="Your message..."/>
        <button type="submit">Send meagaes
        </button>

    </form>
</main>