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
	.product-category-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;
		margin: 20px;
	}

	.product-category {
		background-color: #f8f8f8;
		border: 1px solid #ddd;
		border-radius: 15px;
		overflow: hidden;
		transition: box-shadow 0.3s ease;
	}

	.product-category:hover {
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
	}

	.product-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 20px;
	}

	.section-title {
		font-size: 1.2em;
		font-weight: bold;
		margin-bottom: 0.5em;
		color: #333;
	}

	.product-details,
	.vaccine-records,
	.diseases {
		width: 100%;
	}

	.product-container h1 {
		color: #555;
	}

	.product-details h1,
	.vaccine-records h1,
	.diseases h1 {
		margin: 0;
	}
</style>

<div class="product-category-container">
	{#each products as product}
		<div class="product-category">
			<div class="product-container">
				<div class="product-details">
					<div class="section-title">Product ID</div>
					<h1>{product.id}</h1>
				</div>

				<div class="vaccine-records">
					<div class="section-title">Vaccine Records</div>
					{#each product.vaccination_records as pvc}
						<div class="vaccine-record">
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
		</div>
	{/each}
</div>
