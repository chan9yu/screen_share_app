import axios from 'axios';

const BASE_URL = `http://${window.location.hostname}:3036`;

export const apiClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});
