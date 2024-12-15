import { apiClient } from './__private__';

export const createRoom = async (): Promise<{ roomId: string }> => {
	const { data } = await apiClient.post('/rooms/create');
	return data;
};

export const closeRoom = async (roomId: string): Promise<void> => {
	await apiClient.post('/rooms/close', { roomId });
};
