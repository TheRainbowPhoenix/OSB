import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { appApi } from '$api/app';

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load: PageLoad = async ({ params }) => {
	const apiKeys = await appApi.getApiKeys();

	for (const key in apiKeys) {
		if (Object.prototype.hasOwnProperty.call(apiKeys, key)) {
			const apiKey = apiKeys[key];
			if (params.apiKey === apiKey.value) {
				return {
					apiKey
				};
			}
		}
	}

	throw error(404, 'Not found');
};
