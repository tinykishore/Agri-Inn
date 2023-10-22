<script lang="ts">
    import {onMount} from "svelte";
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";

    DynamicNavigation.set(DashboardNavigation);

    export let data;
    let post_detail: any;
    let post_data = false;

    // check if like array contains user id
    let likedByThisUser: boolean = false;

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

    const votePost = async () => {
        likedByThisUser = !likedByThisUser;
        await fetch('/API/v1/forum/UpvotePostAPI', {
            method: 'POST',
            body: JSON.stringify({
                postObjectID: data.postObjectID,
                likerObjectID: data.userObjectID,
                alreadyLiked: likedByThisUser
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

</script>

<main  class="my-20 mx-32">
    <div class="container">
        <div class="row">
            <div class="col-12">
                {#if post_data}
                    {#if (!likedByThisUser)}
                        <button on:click={votePost}
                                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Upvote
                        </button>
                    {:else}
                        <button on:click={votePost}
                                class="bg-zinc-400 text-white font-bold py-2 px-4 rounded">Downvote
                        </button>
                    {/if}
                    <h1>{post_detail.title}</h1>
                    <h2>{post_detail.author}</h2>
                    <h3>{post_detail.timestamp}</h3>
                    <p>{post_detail.post}</p>
                    <h3>{post_detail.likes.length}</h3>
                    <textarea bind:value={postReply} cols="30" rows="10"></textarea>
                    <button on:click={sendReply}>Reply</button>

                    {:else}
                    <h1>Loading...</h1>
                {/if}
            </div>
        </div>
    </div>
</main>