<script lang="ts">
    import {supabase} from "$lib/client/supabase";
    import {afterUpdate, beforeUpdate, onMount} from "svelte";
    import UserCache from "$lib/stores/UserCache";
    import send_icon from "$lib/assets/icons/send-message.svg";
    import Message from "./Message.svelte";

    export let receiverObjectID: string | null = null;
    let messages: any = [];
    let responseOK = false;
    let initTextLoad: number = 16;
    let userCache: any = null;
    let newMessage: string = '';
    let sending: boolean = false;
    let chatWindow: any;

    let moreMessagesLoading: boolean = false;

    UserCache.subscribe((value) => {
        userCache = value;
    });

    beforeUpdate(() => {
        if (responseOK) {
            chatWindow && chatWindow.offsetHeight + chatWindow.scrollTop > chatWindow.scrollHeight - 20
        }
    })

    afterUpdate(() => {
        if (responseOK) {
            chatWindow.scrollTo({
                top: chatWindow.scrollHeight,
                behavior: "smooth"
            })
        }
    })

    onMount(async () => {
        // filter messages where (sender = userCache._id and receiver = receiverObjectID) or (sender = receiverObjectID and receiver = userCache._id)
        const resultList = await supabase
                .from('chat')
                .select()
                .order('created_at', {ascending: false})
                .limit(initTextLoad)
                .or('sender.eq.' + userCache._id + ',receiver.eq.' + receiverObjectID,)
                .or('sender.eq.' + receiverObjectID + ',receiver.eq.' + userCache._id,)



        messages = resultList.data;
        messages.reverse();
        responseOK = true;

        supabase.channel('schema-db-changes').on(
            'postgres_changes',
            {schema: 'public', event: '*'},
            (payload: any) => {
                messages = [payload.new, ...messages];
                messages = messages.filter((message: any) => message.id !== payload.old.id);
                messages.sort((a: any, b: any) => {
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                });
            }
        )
            .subscribe()

        const textarea = document.getElementById('message') as HTMLTextAreaElement;
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        })

        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault();
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const value = textarea.value;
                textarea.value = value.substring(0, start) + "\n" + value.substring(end);
                textarea.selectionStart = textarea.selectionEnd = start + 1;
            }
        })

    });

    const sendMessage = async () => {
        if (!newMessage || !/\S/.test(newMessage)) return;
        sending = true;

        const response = await supabase.from('chat').insert([{
            body: newMessage,
            sender: userCache._id,
            receiver: receiverObjectID,
            sender_avatar: userCache.profile_picture,
        },]);

        if (response.status === 201) {
            newMessage = '';
            sending = false;
            return Promise.resolve();
        }

        return Promise.reject();
    }

    const backRead = async (e: any) => {
        let clientHeight = e.srcElement.scrollTop
        if (clientHeight == 0) {
            chatWindow.classList.add('blur-sm')
            await loadMore()
            chatWindow.classList.remove('blur-sm')
            chatWindow.scrollTo(0, clientHeight + 700)
        }
    }

    const loadMore = async () => {
        moreMessagesLoading = true;
        const resultList = await supabase
            .from('chat')
            .select('*')
            .order('created_at', {ascending: false})
            .limit(initTextLoad += 16)
        messages = resultList.data;
        messages.reverse();
        moreMessagesLoading = false;
    }

</script>

<main class="w-fit mb-24 mt-16">
    <div class="px-2">
        {#if !responseOK}
            <p>Loading...</p>
        {:else}
            <div on:scroll={backRead} bind:this={chatWindow}
                 class="flex flex-col gap-2 my-3 h-96 overflow-y-auto hide-scrollbar">
                {#each messages as message (message.id)}
                    <Message message={message.body}
                             sender_avatar={message.sender_avatar}
                             is_sender_me={message.sender === userCache._id}
                    />
                {/each}
            </div>
        {/if}
    </div>


    <form class="flex gap-2 align-middle items-center justify-between"
          on:submit|preventDefault={sendMessage}>
        {#if moreMessagesLoading}
            <h1 class="py-2.5 px-3 text-xl font-bold text-zinc-400">Loading More Messages...</h1>
        {:else}
            <textarea autocomplete="off"
                      bind:value={newMessage} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm
        rounded-2xl outline-none focus:shadow-md block w-full py-2.5 px-3 transition-all
        duration-300 antialiased resize-none"
                      id="message"
                      name="message"
                      placeholder="Message"
                      rows="1"/>
        {/if}

        <button type="submit">
            {#if sending}
                <svg class="animate-spin h-6 w-6 text-amber-800 ml-3" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10"
                            stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0
                   12h4zm2 5.291A7.962 7.962 0 014 12H0c0
                   3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
            {:else}
                <img class="h-6 w-6 ml-2" src={send_icon} alt="send message"/>
            {/if}
        </button>
    </form>
</main>

<style>
    /* Hide scrollbar for Chrome, Safari and Opera */
    .hide-scrollbar::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .hide-scrollbar {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
</style>