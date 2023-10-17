import {TURNSTILE_KEY} from "$env/static/private";

export const cfTurnstileValidation = async (token: string) => {
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            secret: TURNSTILE_KEY,
            response: token
        })
    });
    const outcome = await result.json();
    return !!outcome.success;
}