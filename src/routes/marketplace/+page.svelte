<script lang="ts">
    import DynamicNavigation from "$lib/stores/DynamicNavigation";
    import {onMount} from "svelte";
    import DefaultNavigation from "$lib/components/dynamicNavigations/DefaultNavigation.svelte";
    import {cartArray} from "$lib/stores/Cart";

    //export let data
    DynamicNavigation.set(DefaultNavigation);

    let allProducts: any;
    let filteredProducts: any;


    let selectedCategory = 'Dairy';
    let localCartArray: any = [];
    let cartList: any;
    let count = 0;
    let itemNumber = 0;


    cartArray.subscribe((value) => {
        localCartArray = value;
    });

    const incrementCount = (event:any) => {
        cartList = {
            id: event.target.getAttribute("data-pid"),
            name: event.target.getAttribute("data-pname"),
            price:  event.target.getAttribute("data-pprice"),
            quantity: 1
        };

        // dispatched cartList from SellGrid.svelte, if localCartArray contains the cartlist then increment the count
        if (localCartArray.some((i: any) => i.id === cartList.id)) {
            cartArray.update((value) => {
                value.forEach((i: any) => {
                    if (i.id === cartList.id) {
                        i.quantity++;
                    }
                });
                return value;
            });
        } else {
            // else add item to cart
            cartArray.update((value:any) => {
                value.push(cartList);
                return value;
            });
        }
        count++;
        try {
            localStorage.setItem('cart', JSON.stringify(localCartArray));
        } catch (error:any) {
            console.error(error.message); //raises the error
        }

        console.log(localStorage.getItem('cart'))
    }


    onMount(async () => {
        const response = await fetch('/API/v1/marketplace/getAllProductsmarketAPI');
        allProducts = await response.json();
        filteredProducts = allProducts.filter((product: any) => product.product_type === selectedCategory);
        cartArray.subscribe(value => {
            let sum = 0;
            value.forEach((i: any) => {
                sum += i.quantity;
                itemNumber = sum;
            });
        });
    });

    function handleCategoryKeyChange(event: any) {
        const categoryKey = event.target.value;
        console.log(categoryKey);
        filteredProducts = allProducts.filter((product: any) => product.product_type === categoryKey);
    }

    const clearCart = () => {
        localStorage.removeItem('cart')
        localCartArray = [];
        console.log(localStorage.getItem('cart'))
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
                <div class="group relative rounded-2xl h-72">
                    <img alt="" class="rounded-2xl object-cover w-full h-full" src={product.img} />
                    <div class="text-white rounded-2xl absolute top-0 left-0 w-full h-full flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-black-100/10 group-hover:h-full group-hover:opacity-100">
                        <h1 class="text-xl font-black bg-yellow-class p-2 rounded-md">{product.product_name}</h1>
                        <h1 class="text-xl font-bold bg-yellow-class p-2 rounded-md">{product.product_type}</h1>
                        <h1 class="text-xl font-bold bg-yellow-class p-2 rounded-md">{product.manufacturer}</h1>
                        <h1 class="text-xl font-bold bg-yellow-class p-2 rounded-md">{product.product_price}</h1>
                    </div>
                    <button data-pid={product.product_id} data-pname={product.product_name} data-pprice={product.product_price} class="bg-amber-600 text-white w-fit font-bold py-2 px-4 rounded-full hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-opacity-50 hover:shadow-md transition duration-300"
                            on:click={incrementCount}>Add to Cart
                    </button>
                </div>
            {/each}
                      <div class="text-5xl">View Cart {itemNumber}</div>
              <a href="/marketplace/cart">Cart e jao</a>
              <button on:click={clearCart}>
                  Clear Cart
              </button>
          </div>
        {/if}
</main>
