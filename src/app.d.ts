// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

interface SignInCredentials {
	key: string
	password: string
}

interface Post {
	title: string
	post : string
	author : string
	timestamp : number
	likes: [],
	viewCount : number,
	profilePicture : string
}

interface Credentials {
	email: string
	username: string
	password_hash: string
	password_reset_token: string
	google_id: string
}