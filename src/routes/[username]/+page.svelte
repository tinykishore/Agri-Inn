<script lang="ts">
	// This page has two states
	export let data;
</script>

{#if data.usernameOwner}
	<p>You can edit profile</p>
	<p>Username: {data.username}</p>
{:else}
	<p>You can't edit profile</p>
	<p>Username: {data.username}</p>
{/if}