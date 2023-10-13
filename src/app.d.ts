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

interface Posts {
	post : string
	title : string
	author : string
	timestamp : number
	likes : number
}
