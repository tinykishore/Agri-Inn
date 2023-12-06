<script lang="ts">
    import Chat from "../chat/Chat.svelte";

    export let data;
</script>

{#if data.usernameVerified}
	<p>You can edit profile</p>
	<p>Username: {data.username}</p>
{:else}
	<p>You can't edit profile</p>
	<p>Username: {data.username}</p>
	<Chat receiverObjectID={data.usernameObjectID}/>
{/if}