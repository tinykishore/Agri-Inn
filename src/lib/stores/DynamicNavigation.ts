import {writable} from 'svelte/store';

export default writable();

export let forum_id_navigation = writable({
    postObjectID: undefined,
    userObjectID: undefined,
    alreadyUpvoted: false,
    currentURL: "",
    totalLikes: 0,
    totalViews: 0,
    fontSize: 14,
    self: false,
});

export let search_navigation = writable({
    query: "",
    search_results: {}
});


export let farm_productID_navigation = writable({
    productID: "",
    farm_name: "",
    product_price: 0,
    availability: ""
});

export let news_ID_navigation = writable({
    // userid : "",
    news_id : ""

});