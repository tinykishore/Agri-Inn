<script lang="ts">
    import {afterUpdate, onMount} from "svelte";
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import {formatEpochToCustom} from "$lib/client/utility";
    import UserCache from "$lib/stores/UserCache";
    import Forum_ID_Navigation from "$lib/components/dynamicNavigations/forum/Forum_ID_Navigation.svelte";
    import {forum_id_navigation} from "$lib/stores/DynamicNavigation.js";
    import DefaultNavigation from "$lib/components/dynamicNavigations/DefaultNavigation.svelte";
    import {fade} from "svelte/transition";
    import forum_id_bg from "$lib/assets/images/forum_id_bg.jpg";

    DynamicNavigation.set(DefaultNavigation);

    export let data;
    let post_detail: any;
    let post_data = false;
    let timeToRead: number;
    let fontSize: number;

    let wordCount: number;
    // check if like array contains user [id]

    let likedByThisUser: boolean = false;
    let loggedInUser: string | undefined = undefined;
    let loggedInUserName: string | undefined = undefined;

    UserCache.subscribe(value => {
        loggedInUser = value.full_name;
        loggedInUserName = value.username;
    })
    forum_id_navigation.subscribe(value => {
        fontSize = value.fontSize;
    })

    afterUpdate(() => {
        const post_body = document.getElementById("post_body");
        if (post_body) {
            post_body.style.fontSize = `${fontSize}px`;
        }
    })

    onMount(async () => {
        const post_detail_response = await fetch('/API/v1/forum/GetOnePostAPI', {
            method: 'POST',
            body: JSON.stringify(data.postObjectID),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        post_detail = await post_detail_response.json();

        for (let i = 0; i < post_detail.likes.length; i++) {
            if (post_detail.likes[i] === data.userObjectID) {
                likedByThisUser = true;
                break;
            }
        }

        // count how many words in the post
        wordCount = post_detail.post.split(" ").length;
        // calculate the time it takes to read the post
        timeToRead = Math.round(wordCount / 200);

        forum_id_navigation.set({
            postObjectID: data.postObjectID,
            userObjectID: data.userObjectID,
            alreadyUpvoted: likedByThisUser,
            currentURL: window.location.pathname,
            totalLikes: post_detail.likes.length,
            totalViews: post_detail.viewCount,
            fontSize: 18,
            self: post_detail.author === loggedInUserName
        });
        DynamicNavigation.set(Forum_ID_Navigation);

        post_data = true;
        await incrementViewCount();
    })


    async function incrementViewCount() {
        setTimeout(async () => {
            await fetch('/API/v1/forum/IncrementViewCountAPI', {
                method: 'POST',
                body: JSON.stringify(data.postObjectID),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, 2500);
    }

    let postReply = "";

    async function sendReply() {
        const reply_data = {
            "post_uid": data.postObjectID,
            "reply": postReply,
            "author": "test",
            "timestamp": "test"
        }

        const reply_response = await fetch('/API/v1/forum/SendReplyAPI', {
            method: 'POST',
            body: JSON.stringify(reply_data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const reply_result = await reply_response.json();
    }

</script>

<section class="fixed bg-fixed top-0 left-0 h-screen w-screen -z-50">
    <img alt="sign-in-bg" class="w-full h-full bg-fixed object-cover" src="{forum_id_bg}">
</section>

<main class="my-28 mx-64">
    {#if post_data}
        <div class="flex flex-col gap-4">
            <h1 class="text-5xl font-bold">{post_detail.title}</h1>

            <div class="flex justify-between align-middle items-center">
                <div class="flex items-center gap-4 my-4">
                    <img class="w-11 h-11 rounded-full" src={post_detail.profilePicture}
                         alt="authorAvatar"/>
                    <div>
                        <a href="/{post_detail.author}" class="font-bold group-hover:text-amber-600 transition-all
                    hover:text-amber-600 duration-300">{post_detail.author}</a>
                        <div class="font-light text-sm text-zinc-400">Posted
                            on {formatEpochToCustom(post_detail.timestamp)}
                        </div>
                    </div>
                </div>

                <div class="flex flex-col  my-4 items-end justify-end text-zinc-400 font-bold">
                    <h1>Total {wordCount} words</h1>
                    <h1>About {timeToRead} minutes read...</h1>
                </div>

            </div>

            {#key fontSize}
                <p in:fade id="post_body" class="whitespace-pre-line hover:antialiased p-1">{post_detail.post}</p>
            {/key}

            <hr class="border-2 rounded-full w-full">
        </div>

        <div id="comment-section" class="flex flex-col mt-4 items-start justify-start">
            <h1 class="text-xl font-bold">Comment as {loggedInUser}</h1>
            <textarea bind:value={postReply} cols="20" rows="5" placeholder="What are your thoughts?"
                      class="whitespace-pre-line transition duration-300 my-3 border border-orange-200 resize-none
                      bg-zinc-50 px-4 w-full py-2 rounded-2xl focus:outline-none hover:shadow-md"></textarea>
            <button class="bg-amber-600 text-white w-fit font-bold py-2 px-4 rounded-full hover:bg-amber-700
            focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-opacity-50 hover:shadow-md transition duration-300"
                    on:click={sendReply}>Comment
            </button>
        </div>

    {:else}
        <div>
            <h1>Loading Story</h1>
        </div>
    {/if}

</main>