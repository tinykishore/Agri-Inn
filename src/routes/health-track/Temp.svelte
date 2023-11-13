<script lang="ts">
    import {onMount} from "svelte";

    export let product_category: string;
    export let farm_id: string;

    let products: any = [];

    onMount(async () => {
        // Get all product by category

        if (product_category == '' || farm_id == '') {
            return;
        }
        const response = await fetch('/API/v1/farms/GetCategoryProducts', {
            method: 'POST',
            body: JSON.stringify(
                {
                    "product_category": product_category,
                    "farm_id": farm_id
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        products = await response.json();
    });

</script>


<div>

	{#each products as product}
		<div class="flex gap-4 items-center align-middle bg-orange-50 rounded-2xl">
			<h1>{product.id}</h1>
			<div class="flex flex-col gap-2">
				{#each product.vaccination_records as pvc}
					<h1>{pvc.vaccine_name}</h1>
					<h1>{pvc.date_administered}</h1>
				{/each}
			</div>
		</div>

		{#each product.diseases as disease}
			<h1>{disease}</h1>
		{/each}

	{/each}

</div>