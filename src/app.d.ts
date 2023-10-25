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
}