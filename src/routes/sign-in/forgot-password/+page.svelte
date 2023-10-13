<script lang="ts">

    let email: string;

    const handleSubmit = async () => {
        const res = await fetch('/API/v1/auth/ForgotPasswordAPI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
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
        <input type="email" id="email" name="email" required bind:value={email} />

        <button type="submit">Send Reset Link</button>
    </form>
</main>