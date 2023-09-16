import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { appApi } from '$api/app';

export const load: PageLoad = async ({ params }) => {
	// getStaticProps

	const apiKeys = await appApi.getApiKeys();

	if (!apiKeys?.length) {
		throw error(404, 'No API Keys found.');
	}

	return {
		apiKeys,
		revalidate: 300
	};
};
