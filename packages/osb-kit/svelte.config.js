import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		alias: {
			$api: 'src/api',
			$store: 'src/store'
		},
		csp: {
			mode: 'hash',
			directives: {
				'object-src': ['self']
			}
		},
		// appDir: 'app', // The directory relative to `paths.assets` where the built JS and CSS (and imported assets) are served from.
		embedded: true, // Whether or not the app is embedded inside a larger app, SvelteKit will add its event listeners related to navigation etc on the parent of `%sveltekit.body%` instead of `window`,
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({ fallback: 'index.html' }),
		prerender: {
			crawl: false,
			entries: ['/']
		}
	}
};

export default config;
