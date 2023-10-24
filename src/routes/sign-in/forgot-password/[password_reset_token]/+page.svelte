<script lang="ts">

    import type {ActionData} from './$types';
    import {enhance} from "$app/forms";

    export let form: ActionData

</script>

<form class=" mt-16" on:submit|preventDefault use:enhance method="POST">
    {#if form?.success}
        <p class="text-green-600">Password changed succesffuly!</p>
    {/if}
    <input class="bg-black text-white" type="password" id="newPassword" name="newPassword" placeholder="New password"
           required/>
    <input class="bg-black text-white" type="password" id="confirmPassword" name="confirmPassword"
           placeholder="Confirm new password" required/>
    <button type="submit">Submit</button>
</form>
