import { getLocalStorageItem, setLocalStorageItem } from '@namastay/utils';

export const getApiInstance = (providedApiKey?: string) => {
	const apiURL: string = '/api'; // 'https://api.namastay.io/api/v1';

	const makeRequest = async (path: string, method: string, body: object | null) => {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json'
		};

		// Add the API key to headers if provided
		if (providedApiKey) {
			headers['Authorization'] = `Bearer ${providedApiKey}`;
		}

		const url = `${apiURL}${path}`;

		// Create the request options
		const requestOptions = {
			method,
			headers,
			...(body && { body: JSON.stringify(body) })
		};

		// Make the HTTP request
		const response = await fetch(url, requestOptions);

		// Handle response, parse JSON, etc.
		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		const responseData = await response.json();

		return responseData;
	};

	return {
		get: async (path: string) => makeRequest(path, 'GET', null),
		post: async (path: string, data: object) => makeRequest(path, 'POST', data),
		put: async (path: string, data: object) => makeRequest(path, 'PUT', data),
		delete: async (path: string) => makeRequest(path, 'DELETE', null)
	};
};
