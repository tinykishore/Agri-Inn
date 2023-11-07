// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type {USER_ROLE} from "$lib/client/utility";

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface SignInCredentials {
		key: string
		password: string
	}

	interface TypeUserCache {
		_id: string | undefined
		full_name: string | undefined
		email: string | undefined
		username: string | undefined
		profile_picture: string | undefined
		user_role: USER_ROLE | undefined
	}

	interface Post {
		title: string
		post: string
		author: string
		timestamp: number
		likes: [],
		viewCount: number,
		profilePicture: string
	}

	interface Credentials {
		email: string
		username: string
		password_hash: string
		password_reset_token: string
		google_id: string
	}

	interface Address {
		street: string,
		city: string,
		state: string,
		zip: string,
		country: string
	}

	interface UserObject {
		full_name: string,
		date_of_birth: string,
		gender: string,
		address: Address,
		phone: string,
		occupation: string,
		social_connections: null,
		credentials: Credentials,
		profile_picture: string,
		role: USER_ROLE,
	}

	interface comment {
		author: string | undefined,
		body: string,
		timestamp: number,
		likes: [],
		replies: []
		parent_comment: string
		profilePicture: string
	}

	interface Order {
		"user_id": string,
		"product_id": string,
		"total_amount": number,
		"shipping_address":string,
		"phone_number": string,
		"payment_method": string,
		"isInstallment"?: {
			"status": boolean,
			"paid": number,
			"due": number,
			"installment_remaining": number,
			"installment_deadline": Date
		},
		"order_date": Date,
		"delivery_date": Date
	}

	interface PublicProfile {
		full_name: string,
		username: string,
		email: string,
		gender: string,
		phone: string,
		occupation: string,
		social_connections?: [],
		profile_picture: string
	}

	interface PaymentObject {
		user_id: string,
		product_id: string,
		product_breed: string,
		farm_id: string,
		total_price: number,
		shipping_address: Address,
		payment: {
			method: number,
			card_number: string,
			card_holder: string,
			card_expiration: string,
			card_cvv: string,
			bkash_number: string,
		},
		installment?: {
			total_installment: number,
			remaining_installment: number,
			next_installment_date: Date,
			paid_amount: number,
			due_amount: number,
			monthly_fee:number,
		}
	}
}