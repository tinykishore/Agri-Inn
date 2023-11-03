<script lang="ts">
    import back_icon from "$lib/assets/icons/all-back-icon.svg";
    import {fade} from "svelte/transition";
    import UserCache from "$lib/stores/UserCache";
    import {farm_productID_navigation, forum_id_navigation} from "$lib/stores/DynamicNavigation";
    import wishlist_icon from "$lib/assets/icons/farms_farm_product_id_wishlist_icon.svg";
    import purchase_icon from "$lib/assets/icons/farms_farm_product_id_purchase_icon.svg";
    import {modals} from "$lib/stores/Modals";

    let username: string | undefined;
    let full_name: string | undefined;
    let profile_picture: string | undefined;
    let currentURL: string = "";
    let totalLikes: number = 0;
    let totalViews: number = 0;
    let font_size: number = 18;

    $: {

    }

    forum_id_navigation.subscribe((value) => {

        currentURL = value.currentURL;
        totalLikes = value.totalLikes;
        totalViews = value.totalViews;

    });

    UserCache.subscribe((value) => {
        username = value.username;
        full_name = value.full_name;
        profile_picture = value.profile_picture;
    });


    const onClickPurchase = () => {
        modals.update((value: any) => {
            return {
                ...value,
                farms_farm_product_modal: true
            }
        });
    }

    let productID: string;
    let farm_name: string;
    let product_price: number;
    let availability: string;

    farm_productID_navigation.subscribe((value) => {
        productID = value.productID;
        farm_name = value.farm_name;
        product_price = value.product_price;
        availability = value.availability;
    });

</script>

<div class="grid grid-cols-3 items-center">
	<div class="flex justify-start gap-2 text-sm items-center" in:fade>

		<a href="/farms"
		   class="px-3 py-2 text-sm flex items-center align-middle rounded-full font-bold border border-yellow-800 hover:bg-amber-300 text-yellow-950 transition-all duration-300"><span
				class="block h-5 w-5"><img alt="search_icon" src={back_icon}></span>
			Back
		</a>

		<div class="flex gap-1 px-3 rounded-full align-middle justify-center items-center font-semibold text-yellow-950 transition-all duration-300">
			<h1 class="font-bold py-2">
				Price: <span class="font-mono">${product_price}</span>
			</h1>
		</div>

		<div class="flex gap-1 px-3 rounded-full align-middle justify-center items-center font-semibold text-yellow-950 transition-all duration-300">
			<h1 class="font-bold py-2">
				Availability: <span class="font-mono"> {availability}</span>
			</h1>
		</div>
	</div>

	<div class="gap-x-4 font-bold text-zinc-500 text-center select-none justify-between">
		<h1>
			<span class="font-mono text-amber-900">{farm_name}</span>
			<span class="font-mono px-2">/</span>
			<span class="font-mono text-amber-900">{productID}</span>
		</h1>
	</div>

	<div class="flex justify-end gap-2  text-sm items-center">

		<a class="flex gap-1 px-3 rounded-full align-middle border-yellow-800/20 border justify-center items-center font-semibold text-yellow-950 hover:bg-yellow-300 hover:border-yellow-800 transition-all duration-300"
		   href="/{username}"
		   in:fade>
			<img alt="" class="block w-5 h-5" src={wishlist_icon}/>
			<h1 class="font-bold py-2">Wishlist</h1>
		</a>

		<button class="flex gap-1 font-bold py-2 px-3 rounded-full align-middle border-green-800/20 border justify-center items-center text-green-950 hover:bg-green-300 hover:border-green-800 transition-all duration-300"
				in:fade on:click={onClickPurchase}>
			<img alt="" class="block w-5 h-5" src={purchase_icon}/>
			Purchase
		</button>
		<a class="flex gap-4 rounded-full align-middle border-yellow-800/20 border justify-center items-center font-semibold text-yellow-950  hover:bg-yellow-300 hover:border-yellow-800 transition-all duration-300"
		   href="/{username}"
		   in:fade>
			<h1 class=" pl-4 font-bold py-2">{full_name?.split(" ")[0]}</h1>
			<img alt="" class="h-9 w-9 rounded-full" src={profile_picture}>
		</a>
	</div>
</div>