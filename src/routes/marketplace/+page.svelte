<script lang="ts">
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import {onMount} from "svelte";
    import DefaultNavigation from "$lib/components/dynamicNavigations/DefaultNavigation.svelte";

    //export let data
    DynamicNavigation.set(DefaultNavigation);

    let allProducts: any;
    let filteredProducts: any;

    let selectedCategory = 'Dairy';

    onMount(async () => {
        const response = await fetch('/API/v1/marketplace/getAllProductsmarketAPI');
        allProducts = await response.json();
        console.log(allProducts)
        filteredProducts = allProducts.filter((product: any) => product.product_type === selectedCategory);
    });

    function handleCategoryKeyChange(event: any) {
        const categoryKey = event.target.value;
        console.log(categoryKey);
        filteredProducts = allProducts.filter((product: any) => product.product_type === categoryKey);
    }

</script>
<main class="my-20 mx-32">


    <input type="radio" id="option1" name="options" value="Dairy" on:input={handleCategoryKeyChange}>
    <label for="option1">Dairy</label>

    <input type="radio" id="option2" name="options" value="Meat" on:input={handleCategoryKeyChange}>
    <label for="option2">Meat</label>

    <input type="radio" id="option3" name="options" value="Medicine" on:input={handleCategoryKeyChange}>
    <label for="option3">Medicine</label>

    <input type="radio" id="option4" name="options" value="Food" on:input={handleCategoryKeyChange}>
    <label for="option4">Food</label>

    <input type="radio" id="option5" name="options" value="Equipments" on:input={handleCategoryKeyChange}>
    <label for="option5">Equipments</label>



    <div class="bg-gradient-to-bl from-amber-50 via-yellow-100 to-amber-100 w-full rounded-2xl p-6 flex items-center justify-center">
        <h1 class="text-4xl font-bold">Marketplace</h1>
    </div>

    {#if allProducts === undefined}
        <h1>
            Marketplace products loading
        </h1>
    {:else}
          <div class="grid grid-cols-3 gap-9 my-16">

            {#each filteredProducts as product}
                <a href="/products/{product.product_id}" class="group relative rounded-2xl h-72 hover:scale-105 transition-all duration-300">
                    <img alt="" class="rounded-2xl object-cover w-full h-full" src={product.img} />
                    <div class="text-white rounded-2xl absolute top-0 left-0 w-full h-full flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-black-100/10 group-hover:h-full group-hover:opacity-100">
                        <h1 class="text-xl font-black bg-yellow-class p-2 rounded-md">{product.product_name}</h1>
                        <h1 class="text-xl font-bold bg-yellow-class p-2 rounded-md">{product.product_type}</h1>
                        <h1 class="text-xl font-bold bg-yellow-class p-2 rounded-md">{product.manufacturer}</h1>
                        <h1 class="text-xl font-bold bg-yellow-class p-2 rounded-md">{product.product_price}</h1>
                    </div>
                </a>
            {/each}
          </div>
        {/if}
</main>
