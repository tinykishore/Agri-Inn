<script lang="ts">
    import {onMount} from "svelte";
    import currentNavigation from "$lib/stores/currentNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";

    export let data
    let post_detail: any;
    currentNavigation.set(DashboardNavigation);
    let post_data = false;

    onMount(async () => {
        // Call API to get farm info
        const post_detail_response = await fetch('/API/v1/forum/GetOnePostAPI', {
            method: 'POST',
            body: JSON.stringify(data.post_uid),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        post_detail = await post_detail_response.json();
        post_data = true;
        console.log(post_detail)

    })

    let postReply = "";
    async function sendReply() {
        const reply_data = {
            "post_uid": data.post_uid,
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
        console.log(reply_result)
    }


</script>

<main  class="my-20 mx-32">
    <div class="container">
        <div class="row">
            <div class="col-12">
                {#if post_data}
                    <h1>{post_detail.title}</h1>
                    <h2>{post_detail.author}</h2>
                    <h3>{post_detail.timestamp}</h3>
                    <p>{post_detail.post}</p>
                    <h3>{post_detail.like}</h3>
                    <textarea bind:value={postReply} cols="30" rows="10"></textarea>
                    <button on:click={sendReply}>Reply</button>

                    {:else}
                    <h1>Loading...</h1>
                {/if}
            </div>
        </div>
    </div>
</main>