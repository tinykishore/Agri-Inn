import {writable} from "svelte/store";

export default writable({
    user_id: "",
    product_id: "",
    farm_id: "",
    total_price: 0,
    shipping_address: {
        street: "",
        city: "",
        state: "",
        zip: "",
        country: ""
    },
    payment: {
        method: 0,
        card_number: "",
        card_holder: "",
        card_expiration: "",
        card_cvv: "",
        bkash_number: "",
    },
    installment: 0
});