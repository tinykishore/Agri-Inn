<script lang="ts">
    import {onMount} from "svelte";

    export let product_category: string;
    export let farm_id: string;

    let products: any = [];

    onMount(async () => {
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

<div class="flex flex-col gap-2">
	{#each products as product}
		<div class="bg-white rounded-2xl flex flex-col p-4 gap-2">
			<h1 class="px-3 py-1 text-sm font-mono bg-zinc-300 rounded-full w-fit">
				ID: {product.id}
			</h1>

			<div class="">
				<div class="text-xl font-black text-amber-800 text-center">Vaccine Records</div>
				<table class="min-w-full divide-y divide-gray-200 rounded">
					<!-- Table headers -->
					<thead class="rounded">
					<tr class="bg-orange-200">
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Vaccine Name
						</th>
						<th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
							Date
						</th>
						<!-- Add more headers as needed -->
					</tr>
					</thead>
					<!-- Table body -->
					<tbody class="bg-white divide-y divide-gray-200">
					<!-- Row 1 -->

					</tbody>
				</table>
					{#each product.vaccination_records as pvc}
						<tr>
							<td class="px-6 py-4">{pvc.vaccine_name}</td>
							<td class="px-6 py-4 align-middle items-center flex text-center justify-center">{pvc.date_administered}</td>
						</tr>
					{/each}
				</div>

			<div>
				<h1 class="text-xl font-black text-amber-800 text-center mb-4">Previous Diseases</h1>
				<div class="flex gap-3 justify-center">
					{#each product.diseases as disease}
						<h1 class="bg-amber-700 px-3 py-1 rounded-full font-semibold text-sm text-white">{disease}</h1>
					{/each}
					</div>
				</div>
			</div>
	{/each}
</div>
