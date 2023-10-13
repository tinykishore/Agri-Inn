<script lang="ts">
    let localCartArray:any = [];

    import {cartArray} from "$lib/stores/cart.js";

    cartArray.subscribe((value:any) => {
        localCartArray = value;
    });

    //add prices by removing the currency symbol and adding neumerical value to total
    let total = 0;
    $:{ total = 0;
        for (let i = 0; i < localCartArray.length; i++) {
            let price = localCartArray[i].price;
            let priceNum = price.replace(/[^0-9.-]+/g, "");
            total += parseFloat(priceNum);
        }
    }

    const onRemoveClick = (e: any) => {
        let id = e.target.id;
        let index = localCartArray.findIndex((item:any) => item.id === id);
        localCartArray.splice(index, 1);
        cartArray.set(localCartArray);
    }

</script>


<main>
    {localCartArray.length} items in cart
    {#each localCartArray as item}
        <p>{item.breed}</p>
        <p>{item.price}</p>
        <button id="{item.id}" on:click={onRemoveClick} class="bg-gray-400 px-4 py-2 rounded-lg text-white">
            Remove
        </button>
    {/each}

    <p>---------------------------</p>
    <p>Total: ${total}</p>


    <div>
        <a href=""></a>
    </div>
</main>