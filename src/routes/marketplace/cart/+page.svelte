<script lang="ts">
    import {cartArray} from "$lib/stores/Cart";
    import {modals} from "$lib/stores/Modals";
    import PaymentSection from "../../farms/[farm]/[product_id]/PaymentSection.svelte";

    let cart: any;

    cartArray.subscribe(value => {
        cart = value;
    });

    let total = 0;
    const removeItem = (event: any) => {
        const id = event.target.id;

		const index = cart.findIndex((item: any) => item.id === id);
        const quantity = cart[index].quantity;

        if (quantity > 1) cart[index].quantity = quantity - 1;
		else cart.splice(index, 1);

        cartArray.set(cart);
        total = 0;
    }

    $: {
        cart.forEach((item: any) => {
            total += item.quantity * item.price;
        })
    }

    const onClickPurchase = () => {
        modals.update((value: any) => {
            return {
                ...value,
                farms_farm_product_modal: true
            }
        });
    }
	const dummy:number = 0;
    $: console.log(cart);

    let isPaymentSectionVisible: boolean = false;

    // Subscribe to modals store to show the modal
    modals.subscribe((value) => {
        isPaymentSectionVisible = value.farms_farm_product_modal;
    });

</script>

{#if isPaymentSectionVisible}
	<PaymentSection user_id="" product_id="" farm_id="" total_price={dummy} product_breed=""/>
{/if}

<div class="mt-20 mx-36">
	{#each cart as item}
		<div class="flex items-center justify-between mb-4">
			<div class="text-gray-800 font-semibold">{item.name}</div>
			<div class="text-gray-600">{item.quantity}</div>
			<div class="text-green-700">${item.price}</div>
			<div class="text-blue-600">Total: ${item.quantity * item.price}</div>
			<button id={item.id} class="px-2 py-1 bg-red-500 text-white rounded-md focus:outline-none" on:click={removeItem}>
				Remove
			</button>
		</div>
	{/each}
	<h1 class="text-2xl font-bold mt-4">Total Price: ${total}</h1>
	<button class="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 focus:outline-none" on:click={onClickPurchase}>
		Purchase
	</button>
</div>
