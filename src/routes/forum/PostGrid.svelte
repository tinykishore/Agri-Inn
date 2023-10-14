<script lang="ts">
    import {onMount} from "svelte";

    export let posts: any;

    let isLoaded = false;

    onMount(async () => {
        // load posts and set isloaded to true
    })

</script>


{#if isLoaded}
	<h1>Loading data</h1>

{:else}
	<div class="mt-12">
		<h1>Posts</h1>
		<div class="grid grid-cols-4 gap-4">
			{#each posts as post}
				<div class="bg-amber-100 p-3 rounded-xl shadow-xl">
					<p>{post.author}</p>
					<p>{post.title}</p>
					<p>{post.post}</p>
					<p>{post.timestamp}</p>
					<p>{post.like}</p>
					<button>Like</button>
					<button>View Story</button>
					<button>Save</button>
				</div>
			{/each}
		</div>
	</div>
{/if}
