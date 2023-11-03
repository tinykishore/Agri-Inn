<script lang="ts">
    import save_icon from "$lib/assets/icons/forum-post-save-icon.svg";
    import like_icon from "$lib/assets/icons/forum-post-like-icon.svg";
    import liked_icon from "$lib/assets/icons/forum-post-liked-icon.svg";
    import comment_icon from "$lib/assets/icons/forum-post-comment-icon.svg";
    import view_icon from "$lib/assets/icons/view-icon.svg";
    import report_icon from "$lib/assets/icons/forum-post-report-icon.svg";
    import share_icon from "$lib/assets/icons/forum-post-share-icon.svg";
    import {fade} from "svelte/transition";
    import UserCache from "$lib/stores/UserCache";
    import {forum_id_navigation} from "$lib/stores/DynamicNavigation";
    import forum_text_size_icon from "$lib/assets/icons/forum-text-font.svg";

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

    $: {
        forum_id_navigation.update((value) => {
            return {
                ...value,
                fontSize: font_size
            }
        });
    }

    forum_id_navigation.subscribe((value) => {
        postObjectID = value.postObjectID;
        userObjectID = value.userObjectID;
        likedByThisUser = value.alreadyUpvoted;
        currentURL = value.currentURL;
        totalLikes = value.totalLikes;
        totalViews = value.totalViews;
        self = value.self;
    });

    UserCache.subscribe((value) => {
        username = value.username;
        full_name = value.full_name;
        profile_picture = value.profile_picture;
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

		<a class="flex gap-1 px-3 rounded-full align-middle border-amber-950/30 border justify-center items-center font-semibold text-yellow-950 hover:bg-white hover:border-white transition-all duration-300"
		   href={currentURL + "#comment-section"}>
			<img alt="" class="block w-6 h-6" src={comment_icon}/>
			<span class="font-bold py-2">Comment</span>
		</a>

		<button class="flex gap-1 px-3 rounded-full align-middle border-yellow-800/20 border justify-center items-center font-semibold text-yellow-950 hover:bg-yellow-300 hover:border-yellow-800 transition-all duration-300"
				on:click={shareButtonAction}>
			<img alt="" class="block w-5 h-5 mr-1" src={share_icon}/>
			<span class="font-bold py-2">Share Post</span>
		</button>
	</div>

	<div class="gap-x-4 font-bold text-sm text-zinc-500 text-center select-none justify-between">
		<div class="flex justify-evenly items-center align-middle" in:fade={{ duration: 200, delay: 200 }}>
			<div class="flex gap-4 justify-center align-middle items-center">
				<div class="flex items-center align-middle gap-1">
					<img alt="" class="block w-5 h-5" src={liked_icon}/>
					<h1 class="font-bold py-2">{totalLikes}</h1>
				</div>
				<div class="h-5 w-1 rounded bg-zinc-300"></div>
				<div class="flex items-center align-middle gap-1">
					<img alt="" class="block w-5 h-5" src={view_icon}/>
					<h1 class="font-bold py-2">{totalViews}</h1>

				</div>
				<div class="h-5 w-1 rounded bg-zinc-300"></div>
				<div class="flex items-center align-middle gap-1">
					<img alt="" class="block w-5 h-5" src={comment_icon}/>
					<h1 class="font-bold py-2">0</h1>
				</div>
			</div>
			<div class="flex h-full">
				<div>
					<input bind:group={font_size}
						   class="hidden peer"
						   id="small"
						   name="font_size"
						   type="radio"
						   value="14"/>
					<label class="inline-flex h-full items-center justify-between px-5 py-2 rounded-l-full
					text-amber-900 bg-white border border-amber-200
					cursor-pointer peer-checked:border-amber-600 peer-checked:text-amber-600
					hover:text-amber-600 hover:bg-amber-100" for="small">
						<span>
							<img alt="" class="w-3 h-3" src={forum_text_size_icon}/>
						</span>
					</label>
				</div>

				<div>
					<input bind:group={font_size}
						   class="hidden peer"
						   id="medium" name="font_size"
						   type="radio"
						   value="18"/>
					<label class="inline-flex items-center h-full justify-between px-5 py-2
					text-amber-900 bg-white border border-amber-200
					cursor-pointer peer-checked:border-amber-600 peer-checked:text-amber-600
					hover:text-amber-600 hover:bg-amber-100" for="medium">
						<span>
							<img alt="" class="w-4 h-4" src={forum_text_size_icon}/>
						</span>
					</label>
				</div>

				<div>
					<input bind:group={font_size}
						   class="hidden peer"
						   id="large"
						   name="font_size"
						   type="radio"
						   value="22"/>
					<label class="inline-flex items-center justify-between px-5 py-2 rounded-r-full
					text-amber-900 bg-white border border-amber-200
					cursor-pointer peer-checked:border-amber-600 peer-checked:text-amber-600
					hover:text-amber-600 hover:bg-amber-100" for="large">
						<span>
							<img alt="" class="w-5 h-5" src={forum_text_size_icon}/>
						</span>
					</label>
				</div>
			</div>
		</div>
	</div>

	<div class="flex justify-end gap-2  text-sm items-center">
		{#if self}
			<a class="flex gap-1 px-3 rounded-full align-middle border-yellow-800/20 border justify-center items-center font-semibold text-yellow-950 hover:bg-yellow-300 hover:border-yellow-800 transition-all duration-300"
			   href="/{username}"
			   in:fade>
				<img alt="" class="block w-5 h-5" src={report_icon}/>
				<h1 class="font-bold py-2">Edit Post</h1>
			</a>
		{:else}
		<a class="flex gap-1 px-3 rounded-full align-middle border-yellow-800/20 border justify-center items-center font-semibold text-yellow-950 hover:bg-yellow-300 hover:border-yellow-800 transition-all duration-300" href="/{username}"
		   in:fade>
			<img alt="" class="block w-5 h-5" src={report_icon}/>
			<h1 class="font-bold py-2">Report Post</h1>
		</a>
		{/if}
		<a class="flex gap1 px-3 rounded-full align-middle border-yellow-800/20 border justify-center items-center font-semibold text-yellow-950 hover:bg-yellow-300 hover:border-yellow-800 transition-all duration-300"
		   href="/{username}"
		   in:fade>
			<img alt="" class="block w-5 h-5" src={save_icon}/>
			<h1 class="font-bold py-2">Save Post</h1>
		</a>
		<a class="flex gap-4 rounded-full align-middle border-yellow-800/20 border justify-center items-center font-semibold text-yellow-950  hover:bg-yellow-300 hover:border-yellow-800 transition-all duration-300" href="/{username}"
		   in:fade>
			<h1 class=" pl-4 font-bold py-2">{full_name?.split(" ")[0]}</h1>
			<img alt="" class="h-9 w-9 rounded-full" src={profile_picture}>
		</a>
	</div>
</div>