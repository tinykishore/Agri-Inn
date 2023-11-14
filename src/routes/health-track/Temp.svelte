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

<style>
	.product-container {
		transition: box-shadow 0.3s ease;
	}

	.product-container:hover {
		box-shadow: inset 0 0 10px #ffc107;
	}

	.product-container:hover h1 {
		color: #555;
	}

	.section-title {
		font-size: 1.2em;
		font-weight: bold;
		margin-bottom: 0.5em;
	}

	.product-details,
	.vaccine-records,
	.diseases {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>

<div class="flex flex-col gap-3 bg-amber-300/60 backdrop-blur-2xl rounded-2xl p-6 overflow-y-scroll align-middle">

	{#each products as product}
		<div class="flex gap-4 items-center align-middle bg-orange-50 rounded-2xl product-container">
			<div class="product-details">
				<div class="section-title">Product ID</div>
				<h1>{product.id}</h1>
			</div>

			<div class="vaccine-records">
				<div class="section-title">Vaccine Records</div>
				{#each product.vaccination_records as pvc}
					<div class="flex flex-col gap-2">
						<h1>{pvc.vaccine_name}</h1>
						<h1>{pvc.date_administered}</h1>
					</div>
				{/each}
			</div>

			<div class="diseases">
				<div class="section-title">Diseases</div>
				{#each product.diseases as disease}
					<h1>{disease}</h1>
				{/each}
			</div>
		</div>
	{/each}

</div>



