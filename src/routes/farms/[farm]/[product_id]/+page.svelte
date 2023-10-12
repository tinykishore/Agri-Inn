<script lang="ts">
    import {onMount} from "svelte";

    export let data;
    const product_id = data.product_id;

    let product_info: any;
    onMount(async () => {
        // Call api to get product data
        const response = await fetch('/API/v1/farms/GetProductInfoAPI', {
            method: 'POST',
            body: JSON.stringify(product_id),
            headers: {
                'Content-Type': 'application/json'
            }
        });
		product_info = await response.json();
	});

</script>


<main>
	{#if product_info === undefined}
		<p>Loading...</p>
	{:else}
		<h1>{product_info.id}</h1>
		<p>{product_info.health_status}</p>
		<h1 class="text-4xl">Payment --------</h1>
		<button>Add to cart</button>
	{/if}

</main>