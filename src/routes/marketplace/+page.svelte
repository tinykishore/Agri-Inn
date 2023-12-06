<script lang="ts">
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import DashboardNavigation from "$lib/components/dynamicNavigations/DashboardNavigation.svelte";
    import {onMount} from "svelte";

    //export let data
    DynamicNavigation.set(DashboardNavigation);

    let products: any;
    // let isSubmitting = false;

    // export let onPostSubmit = async () => {
    //     isSubmitting = true;
    //     // Validation Check
    //     if (postTitle == "" || postBody == "") {
    //         alert("Post Title and Post Body cannot be empty");
    //         return;
    //     }
    //
    //     onMount(async () => {
    //         const response = await fetch('/API/v1/marketplace/getAllProductsmarketAPI');
    //         products = await response.json();
    //         console.log(products)
    //     });
    // }

</script>
<main class="my-20 mx-32">

    <div class="bg-gradient-to-bl from-amber-50 via-yellow-100 to-amber-100 w-full rounded-2xl p-6 flex items-center justify-center">
        <h1 class="text-4xl font-bold">Marketplace</h1>
    </div>


    {#if products === undefined}
        <h1>
            Marketplace products loading
        </h1>
    {:else}

<!--        <div class="flex justify-between items-center mt-2">-->
<!--            <button class="bg-amber-600 text-white w-fit font-bold py-2 px-4 rounded-full hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-opacity-50 hover:shadow-md transition duration-300"-->
<!--                    on:click={onPostSubmit}>Submit Post-->
<!--            </button>-->
<!--            <button class="bg-amber-600 text-white w-fit font-bold py-2 px-4 rounded-full hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-opacity-50 hover:shadow-md transition duration-300"-->
<!--                    on:click={onPostSubmit}>Submit Post-->
<!--            </button>-->
<!--            <button class="bg-amber-600 text-white w-fit font-bold py-2 px-4 rounded-full hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-opacity-50 hover:shadow-md transition duration-300"-->
<!--                    on:click={onPostSubmit}>Submit Post-->
<!--            </button>-->
<!--            <button class="bg-amber-600 text-white w-fit font-bold py-2 px-4 rounded-full hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-opacity-50 hover:shadow-md transition duration-300"-->
<!--                    on:click={onPostSubmit}>Submit Post-->
<!--            </button>-->
<!--            <button class="bg-amber-600 text-white w-fit font-bold py-2 px-4 rounded-full hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-opacity-50 hover:shadow-md transition duration-300"-->
<!--                    on:click={onPostSubmit}>Submit Post-->
<!--            </button>-->
<!--        </div>-->
          <div class="grid grid-cols-3 gap-9 my-16">

            {#each products as product}

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
