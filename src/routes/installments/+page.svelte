<script lang="ts">
    import {onMount} from "svelte";

    export let data;

    let installments: any;


    onMount(async () => {
        const response = await fetch('/API/v1/farms/GetInstallmentsAPI', {
            method: 'POST',
            body: JSON.stringify(data._id),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        installments = await response.json();
		console.log(installments);

    });


</script>

<div class="mx-32 my-28">
	{#if installments}
		{#each installments as i}
			<div class="flex justify-between">
				<div class="flex gap-1">
					<h1>{i.user_id}</h1>
					<h1>{i.product_breed}</h1>
					<h1>{i.installment.total_installment}</h1>
					<h1>{i.installment.next_installment_date}</h1>
					<h1>{i.installment.remaining_installment}</h1>
					<h1>{i.installment.paid_amount}</h1>
					<h1>{i.installment.due_amount}</h1>
				</div>

				<button class="px-6 py-4 bg-orange-500">
					{i.installment.monthly_fee} Pay
				</button>

			</div>
		{/each}
	{:else}
		<h1>no installments</h1>
	{/if}

</div>