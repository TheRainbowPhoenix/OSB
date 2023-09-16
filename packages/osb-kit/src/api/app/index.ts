import { getApiInstance } from '../provider';

export type ApiKey = {
	name: string;
	value: string;
	type: 'hotel' | 'chain';
};

export const appApi = {
	getStatus: async (timeout: number) => {
		// const response = await getApiInstance().get(`/status`, { timeout });
		// return decodeProviderStatus(response);
		return {
			TODO: 'OK' + timeout
		};
	},

	getApiKeys: async (): Promise<ApiKey[]> => {
		const response = await getApiInstance().get(`/api-keys`);
		return response?.apiKeys;
	}
};
