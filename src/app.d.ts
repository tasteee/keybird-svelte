import type { Font } from 'three/examples/jsm/Addons.js';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
	type FontT = Font;

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
