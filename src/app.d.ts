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

	interface UserObject {
		full_name: string,
		date_of_birth: string,
		gender: string,
		address: {
			street: string,
			city: string,
			state: string,
			zip: string,
			country: string
		},
		phone: string,
		occupation: string,
		social_connections: null,
		credentials: {
			email: string,
			username: string,
			password_hash: string,
			password_reset_token: string,
			google_id: string
		},
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

	interface health_track_animal {
		"farm_id": string,
		"animal_list": {
			"animal_id": string
		},
		"vet_list": {
			"vet_id": string
		},
		"vaccine_list": [
			"Rabies",
			"Distemper",
			"Parvo"
		],
		"selected_vaccine":[],
		"booked_vet":[]
	}
}