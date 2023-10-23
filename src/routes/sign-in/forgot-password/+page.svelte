<script lang="ts">

    import {Turnstile} from "svelte-turnstile";
    import {PUBLIC_TURNSTILE_SITE_KEY} from "$env/static/public";

    let siteKey = PUBLIC_TURNSTILE_SITE_KEY;

    let email: string;

    const handleSubmit = async () => {
        const turnstile_input = document.getElementsByName("cf-turnstile-response")[0] as HTMLInputElement;
        const turnstile_token = turnstile_input.value;
        const res = await fetch('/API/v1/auth/ForgotPasswordAPI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, turnstile_token})
        });

        if (res.ok) {
            alert('Check your email for a reset link');
        } else {
            alert('Something went wrong');
        }

    }
</script>

<main class="mt-12">
    <h1>
        Forgot Password
    </h1>

    <form on:submit|preventDefault={handleSubmit}>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required bind:value={email}/>

        <Turnstile siteKey={siteKey}/>

        <button type="submit">Send Reset Link</button>
    </form>
</main>