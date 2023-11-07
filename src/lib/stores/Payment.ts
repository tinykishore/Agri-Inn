import {writable} from "svelte/store";

export default writable({
    user_id: "",
    product_id: "",
    product_breed: "",
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
    installment: {
        total_installment: 0,
        remaining_installment: 0,
        next_installment_date: new Date(),
        paid_amount: 0,
        due_amount: 0,
        monthly_fee:0,
    }
});