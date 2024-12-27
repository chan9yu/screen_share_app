import twilio from 'twilio';

export class WebRTCService {
	public async getTurnServers() {
		const accountSid = process.env.TWILIO_ACCOUNT_SID;
		const authToken = process.env.TWILIO_AUTH_TOKEN;

		try {
			const client = twilio(accountSid, authToken);
			const token = await client.tokens.create();
			return token.iceServers;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			} else {
				throw new Error('Unable to fetch TURN servers from Twilio.');
			}
		}
	}
}
