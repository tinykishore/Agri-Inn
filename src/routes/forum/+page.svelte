<script lang="ts">
    import {onMount} from "svelte";
    import UserCache from "$lib/stores/UserCache";
    import {isUserCacheValid} from "../../globals";
    import forum_art from "$lib/assets/images/forum-art.svg";
    import logo from "$lib/assets/icons/logo.svg";

    export let data;

    let postTitle: string = "";
    let postBody: string = "";
    let postAuthor: string = "";
    let posts: any = [];
    let mostLikedPosts: any = [];

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
        const getAllPostAPIResponse = await fetch('/API/v1/forum/GetAllPostAPI');
        posts = await getAllPostAPIResponse.json();

        // Get first 5 most liked posts via API GetMostLikedPostsAPI
        const mostLikedAPIResponse = await fetch('/API/v1/forum/GetMostLikedPostAPI');
        mostLikedPosts = await mostLikedAPIResponse.json();
    });

</script>

<main class="my-24 mx-32">
    <div class="grid grid-cols-3 gap-6 h-full">
        <div class="col-span-2 bg-white/70 backdrop-blur-2xl rounded-2xl shadow-md p-6">
            <div class="flex justify-between align-middle items-center">
                <div class="flex flex-col gap-1">
                    <h1 class="text-3xl font-bold text-amber-900 bg-gradient-to-l from-amber-800 to-amber-600 text-transparent bg-clip-text">
                        Ask your questions</h1>
                    <h1 class="text-xl font-semibold text-amber-900">
                        Get answers from the community
                    </h1>
                </div>
                <img alt="" class="h-10" src={logo}/>
            </div>


            <div class="gap grid grid-cols-2 mt-8 gap-4">
                <div class="flex flex-col">
                    <label class="ml-4 font-bold text-zinc-500" for="postTitle">Post Title</label>
                    <label class="ml-4 font-light text-zinc-500 text-sm" for="postTitle">Write what describes your topic
                        in a sentence</label>
                    <input bind:value={postTitle}
                           class="transition duration-300 my-2 border border-orange-200 bg-zinc-50 px-4 py-2 rounded-full focus:outline-none hover:shadow-md"
                           placeholder="Write Your Title Here"
                           type="text">

                    <label class="ml-4 font-bold text-zinc-500" for="postTitle">Post Body</label>
                    <label class="ml-4 font-light text-zinc-500 text-sm" for="postTitle">
                        Your story should be descriptive and clear, let the community know what you are talking about.
                    </label>
                    <textarea
                            bind:value={postBody}
                            class="transition duration-300 my-2 border border-orange-200 bg-zinc-50 px-4 py-2 rounded-2xl focus:outline-none hover:shadow-md"
                            name="post" placeholder="Write Your Post Here in Detail" rows="5"></textarea>

                    <button class="bg-amber-600 mt-2 text-white w-fit font-bold py-2 px-4 rounded-full hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-opacity-50 hover:shadow-md transition duration-300"
                            on:click={onPostSubmit}
                    >Submit Post
                    </button>
                </div>

                <div class="flex flex-col justify-between">
                    <img alt="" class="-translate-y-8" src={forum_art}>
                    <h1 class="text-end text-amber-600 text-xs font-light ">
                        A gentle reminder to all our users, this is a community forum. <br>
                        Please be polite and respectful to others, <br>
                        and keep the conversation constructive
                    </h1>
                </div>

            </div>
        </div>
        <div class="flex flex-col gap-3 bg-amber-300/60 backdrop-blur-2xl rounded-2xl p-4">
            <h1 class="text-2xl font-bold text-amber-800">Trending Topics</h1>
            <h1 class="text-sm font-light text-amber-700">Top 5 most liked posts</h1>
            <div class="grid grid-cols-2 gap-4">

            </div>

        </div>


    <div>
        <h1>Posts</h1>
        <div class="grid grid-cols-4 gap-4">
            {#each posts as post}
                <div class="bg-amber-100 p-3 rounded-xl shadow-xl">
                    <p>{post.author}</p>
                    <p>{post.title}</p>
                    <p>{post.post}</p>
                    <p>{post.timestamp}</p>
                    <p>{post.likes}</p>
                <button>Like</button>
                <button>Comment</button>
                <button>Save</button>
                </div>
            {/each}
        </div>

    </div>
</main>