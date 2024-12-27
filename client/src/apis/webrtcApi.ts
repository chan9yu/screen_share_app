import { apiClient } from './__private__';

type WebRTCTurnResponse = {
	servers: RTCIceServer[];
	message: string;
};

export const getWebRTCTurn = async (): Promise<WebRTCTurnResponse> => {
	const { data } = await apiClient.get('/webrtc/turn');
	return data;
};
