import axios from 'axios';

const BASE_URL = 'http://localhost:3036' as const;

export const apiClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});
