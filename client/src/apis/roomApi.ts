import { apiClient } from './__private__';

export const validateRoom = async (roomId: string): Promise<{ success: boolean }> => {
	const { data } = await apiClient.post('/rooms/validate', { roomId });
	return data;
};

export const createRoom = async (): Promise<{ roomId: string }> => {
	const { data } = await apiClient.post('/rooms/create');
	return data;
};

export const closeRoom = async (roomId: string) => {
	const { data } = await apiClient.post('/rooms/close', { roomId });
	return data;
};
