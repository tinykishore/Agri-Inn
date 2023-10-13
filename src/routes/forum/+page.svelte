<script lang="ts">
    import {onMount} from "svelte";
    import UserCache from "$lib/stores/UserCache";
    import {isUserCacheValid} from "../../globals";

    export let data;

    let postTitle: string = "";
    let postBody: string = "";
    let postAuthor: string = "";
    let posts: any = [];

    export let onPostSubmit = async () => {
        // Validation Check
        if (postTitle == "" || postBody == "") {
            alert("Post Title and Post Body cannot be empty");
            return;
        }

        // Get Author
        UserCache.subscribe(value => {
            postAuthor = value.username;
        });

        let post: Post = {
            title: postTitle,
            post: postBody,
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

        if (response.ok) {
            alert("Post Submitted");
            const response = await fetch('/API/v1/forum/GetAllPostAPI');
            posts = await response.json();
        } else {
            alert("Post Submission Failed");
        }
    }

    onMount(async () => {
        // Update the user cache if it is not valid
        if (!isUserCacheValid()) {
            UserCache.update(value => {
                value.full_name = data.full_name;
                value.email = data.email;
                value.profile_picture = data.profile_picture;
                value.username = data.username;
                value.role = data.user_role;
                return value;
            });
        }

        // Get all posts via API GetAllPostAPI
        const response = await fetch('/API/v1/forum/GetAllPostAPI');
        posts = await response.json();
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