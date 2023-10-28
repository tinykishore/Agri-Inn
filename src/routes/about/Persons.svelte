<script lang="ts">
    export let contributor: any;

    async function hasName(login: string) {
        console.log(login);
        const response = await fetch(`https://api.github.com/users/${login}`);
        const data = await response.json();
        if (data.name) {
            return data.name;
        } else {
            return false;
        }
    }
</script>

<a class="flex gap-4 rounded-2xl w-full p-3 hover:bg-amber-200
hover:drop-shadow-sm transition-all duration-300 items-center justify-start align-middle"
   href={contributor.html_url}
   target="_blank">
	<img alt="" class="w-12 h-12 rounded-full" src={contributor.avatar_url}/>

	<div class="flex-col flex w-full justify-start align-middle items-start">
		{#await hasName(contributor.login)}
			<div class="flex-col flex w-full justify-start align-middle items-start">
				<div class="text-sm font-medium text-zinc-500">{contributor.login}</div>
			</div>
		{:then hasName}
			{#if hasName}
				<div class="flex-col flex w-full justify-start align-middle items-start">
					<div class="text-lg font-bold">{hasName}</div>
					<div class="text-sm font-medium text-zinc-500">{contributor.login}</div>
				</div>
			{:else}
				<div class="flex-col flex w-full justify-start align-middle items-start">
					<div class="text-lg font-bold">{contributor.login}</div>
				</div>
			{/if}
		{/await}
	</div>

</a>