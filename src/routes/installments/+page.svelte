<script lang="ts">
    import {onMount} from "svelte";

    export let data;

    let installments: any;

    let product_name: any = []

    onMount(async () => {
        const response = await fetch('/API/v1/farms/GetInstallmentsAPI', {
            method: 'POST',
            body: JSON.stringify(data._id),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        installments = await response.json();

        // for (let i = 0; i < installments.length; i++) {
        // 	installments[i].next_installment_date = new Date(installments[i].next_installment_date).toLocaleDateString();
        // }

        for (let i of installments) {
            const products = await fetch('/API/v1/farms/GetProductInfoAPI', {
                method: 'POST',
                body: JSON.stringify({product_id: i.product_id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await products.json();
			product_name.push(data.breed);
        }

        console.log(product_name)

    });


</script>

<div class="mx-32 my-28">
	{#if installments}
		{#each installments as i}
			<div class="flex justify-between">
				<div class="flex gap-1">
					<h1>{i.user_id}</h1>
					<h1>{i.payment_id}</h1>
					<h1>{i.installment_no}</h1>
					<h1>{i.next_installment_date}</h1>
					<h1>{i.remaining_installment}</h1>
					<h1>{i.paid_amount}</h1>
					<h1>{i.due_amount}</h1>
				</div>

				<button class="px-6 py-4 bg-orange-500">
					{installments[0].monthly_fee} Pay kor baki ase
				</button>

			</div>
		{/each}
	{:else}
		<h1>no installments</h1>
	{/if}

</div>