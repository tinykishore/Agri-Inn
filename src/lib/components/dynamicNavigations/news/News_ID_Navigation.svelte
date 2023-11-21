<script lang="ts">
    import save_icon from "$lib/assets/icons/forum-post-save-icon.svg";
    import like_icon from "$lib/assets/icons/forum-post-like-icon.svg";
    import liked_icon from "$lib/assets/icons/forum-post-liked-icon.svg";
    import share_icon from "$lib/assets/icons/forum-post-share-icon.svg";
    import {fade} from "svelte/transition";
    import UserCache from "$lib/stores/UserCache";
    import {forum_id_navigation} from "$lib/stores/DynamicNavigation";
    import {news_ID_navigation} from "$lib/stores/DynamicNavigation.js";

    let username: string | undefined;
    let full_name: string | undefined;
    let profile_picture: string | undefined;
    let postObjectID: string | undefined;
    let userObjectID: string | undefined;
    let likedByThisUser: boolean = false;
    let currentURL: string = "";
    let totalLikes: number = 0;
    let totalViews: number = 0;
    let font_size: number = 18;
    let self: boolean = false;
	let news_id : string;
	let user_id : string| undefined;

    $: {
        forum_id_navigation.update((value) => {
            return {
                ...value,
                fontSize: font_size
            }
        });
    }

    news_ID_navigation.subscribe((value) => {
        news_id = value.news_id
    });

    UserCache.subscribe((value) => {
       user_id = value._id
		username=value.username
		full_name=value.full_name
		profile_picture = value.profile_picture
    });

    const shareButtonAction = async (e: Event) => {
        // copy url to clipboard
        const url = window.location.href;
        await navigator.clipboard.writeText(url);

        // Change button text
        const button = e.target as HTMLButtonElement;
        button.innerHTML = "Link Copied!";
        // Change button text back to normal after 2 seconds
        setTimeout(() => {
            button.innerHTML = "Share Post";
        }, 2000);
    }


    const votePost = async () => {
        forum_id_navigation.update((value) => {
            return {
                ...value,
                alreadyUpvoted: !value.alreadyUpvoted,
            }
        });
        totalLikes += likedByThisUser ? 1 : -1;
        await fetch('/API/v1/forum/UpvotePostAPI', {
            method: 'POST',
            body: JSON.stringify({
                postObjectID: postObjectID,
                likerObjectID: userObjectID,
                alreadyLiked: likedByThisUser
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

	const onSaveNews = async()=> {
		const savePost = await fetch('/API/v1/news/saveNewsAPI', {
			method: 'POST',
			body: JSON.stringify({
				news_id,
				user_id
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
    }



</script>

<div class="grid grid-cols-3 items-center">
	<div class="flex justify-start gap-2 text-sm items-center" in:fade>
		{#if !likedByThisUser}
			<button on:click={votePost}
					class="flex gap-1 px-3 rounded-full align-middle border-red-600/60 border justify-center items-center font-semibold text-yellow-950 hover:bg-red-100 hover:border-red-800 transition-all duration-300">
				<img class="block w-6 h-6" src={like_icon} alt=""/>
				<span class="font-bold py-2">Like Post</span>
			</button>
		{:else}
			<button on:click={votePost}
					class="flex gap-1 px-3 rounded-full align-middle border-red-200
		border justify-center items-center font-semibold text-yellow-950 bg-red-200
		hover:bg-red-300 hover:border-red-200 transition-all duration-300">
				<img class="block w-6 h-6" src={liked_icon} alt=""/>
				<span class="font-bold py-2">Liked Post</span>
			</button>
		{/if}



		<button class="flex gap-1 px-3 rounded-full align-middle border-yellow-800/20 border justify-center items-center font-semibold text-yellow-950 hover:bg-yellow-300 hover:border-yellow-800 transition-all duration-300"
				on:click={shareButtonAction}>
			<img alt="" class="block w-5 h-5 mr-1" src={share_icon}/>
			<span class="font-bold py-2">Share Post</span>
		</button>
	</div>

	<div class="gap-x-4 font-bold text-sm text-zinc-500 text-center select-none justify-between">


	</div>

	<div class="flex justify-end gap-2  text-sm items-center">
		<button class="flex gap1 px-3 rounded-full align-middle border-yellow-800/20 border justify-center items-center font-semibold text-yellow-950 hover:bg-yellow-300 hover:border-yellow-800 transition-all duration-300"
		   on:click={onSaveNews}
		   in:fade>
			<img alt="" class="block w-5 h-5" src={save_icon}/>
			<h1 class="font-bold py-2">Save News</h1>
		</button>
		<a class="flex gap-4 rounded-full align-middle border-yellow-800/20 border justify-center items-center font-semibold text-yellow-950  hover:bg-yellow-300 hover:border-yellow-800 transition-all duration-300" href="/{username}"
		   in:fade>
			<h1 class=" pl-4 font-bold py-2">{full_name?.split(" ")[0]}</h1>
			<img alt="" class="h-9 w-9 rounded-full" src={profile_picture}>
		</a>
	</div>
</div>