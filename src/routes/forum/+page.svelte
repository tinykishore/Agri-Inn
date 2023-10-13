<script lang="ts">

    import {onMount} from "svelte";
    import UserCache from "$lib/stores/UserCache";

    let postBody: string = "";
    let postTitle: string = "";
    let postAuthor: string = "";

    UserCache.subscribe((user) => {
        postAuthor = user.username;
    });

    let posts: any = [];
    export let onPostSubmit = async () => {
        let post:Posts = {
            post: postBody,
            title: postTitle,
            author: postAuthor,
            timestamp: Date.now(),
            likes: 0
        }
        const response = await fetch('/API/v1/forum/InsertPostAPI', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    onMount(async () => {
        const getAllposts = await fetch('/API/v1/forum/getAllPostAPI');
        posts = await getAllposts.json();
    });

</script>

<main>
    <input bind:value={postTitle} type="text">
    <textarea bind:value={postBody} name="post" cols="30" rows="10"></textarea>
    <button on:click={onPostSubmit}>Submit Post</button>

    <div>
        <h1>Posts</h1>
        <ul>
            {#each posts as post}
                <li>{post.author}</li>
                <li>{post.title}</li>
                <li>{post.post}</li>
                <li>{post.timestamp}</li>
                <li>{post.likes}</li>
                <button>Like</button>
                <button>Comment</button>
                <button>Save</button>

            {/each}
        </ul>
        </div>
</main>