<script lang="ts">
    import {onMount} from "svelte";
    import UserCache from "$lib/stores/UserCache";
    import forum_art from "$lib/assets/images/forum-art.svg";
    import logo from "$lib/assets/icons/logo.svg";
    import forum_bg from "$lib/assets/images/forum-bg.png";
    import PostGrid from "./PostGrid.svelte";
    import TrendingSection from "./TrendingSection.svelte";
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";

    //export let data;
    DynamicNavigation.set(DashboardNavigation);

    let postSubmittedMessage = false;
    let isSubmitting = false;

    let postTitle: string = "";
    let postBody: string = "";
    let postAuthor: string = "";
    let profilePicture: string = "";
    let posts: any = [];
    let mostLikedPosts: any = [];

    export let onPostSubmit = async () => {
        isSubmitting = true;
        // Validation Check
        if (postTitle == "" || postBody == "") {
            alert("Post Title and Post Body cannot be empty");
            return;
        }

        // Get Author
        UserCache.subscribe(value => {
            postAuthor = value.username;
            profilePicture = value.profile_picture;
        });

        let post: Post = {
            title: postTitle,
            post: postBody,
            author: postAuthor,
            timestamp: getCurrentEpochTime(),
            likes: [],
            viewCount: 0,
            profilePicture: profilePicture
        }

        const response = await fetch('/API/v1/for\ um/InsertPostAPI', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            isSubmitting = false;
            postSubmittedMessage = true;

            setTimeout(()=>{
                postSubmittedMessage = false;
                postTitle = "";
                postBody = "";
            }, 3000);

            const response = await fetch('/API/v1/forum/GetAllPostAPI');
            posts = await response.json();
            posts.sort((a:Post, b:Post) => b.timestamp - a.timestamp);

        } else {
            alert("Post Submission Failed");
        }
    }

    onMount(async () => {
        // Get all posts via API GetAllPostAPI
        const getAllPostAPIResponse = await fetch('/API/v1/forum/GetAllPostAPI');
        posts = await getAllPostAPIResponse.json();
        posts.sort((a:Post, b:Post) => b.timestamp - a.timestamp);

        // Get first 3 most liked posts via API GetMostLikedPostsAPI
        const mostLikedAPIResponse = await fetch('/API/v1/forum/GetMostLikedPostsAPI');
        mostLikedPosts = await mostLikedAPIResponse.json();
    });

    function getCurrentEpochTime(): number {
        return Math.floor(Date.now() / 1000); // Divide by 1000 to get seconds instead of milliseconds
    }


</script>

<section class="fixed bg-fixed top-0 left-0 h-screen w-screen -z-50">
    <img alt="sign-in-bg" class="w-full h-full bg-fixed object-cover" src="{forum_bg}">
</section>

<main class="my-20 mx-32">
    <div class="grid grid-cols-3 gap-6 h-full">
        <div class="flex flex-col col-span-2 bg-white/70 hover:bg-white/90 hover:shadow-xl transition-all duration-300
       backdrop-blur-2xl rounded-2xl shadow-md p-6 justify-evenly">
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
                <div class="flex flex-col justify-between">
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
                            class="whitespace-pre-line transition duration-300 my-2 border border-orange-200 bg-zinc-50
                            px-4 py-2 rounded-2xl focus:outline-none hover:shadow-md resize-none"
                            name="post" placeholder="Write Your Post Here in Detail" rows="5"></textarea>
                    {#if postTitle === "" || postBody === ""}
                        <button disabled class="bg-zinc-400 mt-2 text-white w-fit font-bold py-2 px-4 rounded-full"
                                on:click={onPostSubmit}>Submit Post
                        </button>
                    {:else}
                        {#if isSubmitting}
                            <div class="flex justify-start items-center mt-2 ml-2">
                                <span>
                                    <svg class="animate-spin h-5 w-5 text-yellow-800" xmlns="http://www.w3.org/2000/svg"
                                         fill="none"
                                         viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
				                </span>
                                <h1 class="text-amber-800 w-fit font-bold py-2 px-4 rounded-full">Submitting Post</h1>
                            </div>
                        {:else}
                        <div class="flex justify-between items-center mt-2">
                            <button class="bg-amber-600 text-white w-fit font-bold py-2 px-4 rounded-full hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-opacity-50 hover:shadow-md transition duration-300"
                                on:click={onPostSubmit}>Submit Post
                            </button>
                            {#if (postSubmittedMessage)}
                                <h1 class="text-green-600 font-bold ">Post Submitted!</h1>
                            {/if}
                        </div>
                    {/if}
                    {/if}
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
        <TrendingSection mostLikedPosts={mostLikedPosts}/>
    </div>
    <PostGrid posts={posts}/>
</main>