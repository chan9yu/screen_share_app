import { Request, Response } from 'express';
import { WebRTCService } from '../services/webrtc.service';

export class WebRTCController {
	private webrtcService = new WebRTCService();

	public async getTurnServer(req: Request, res: Response) {
		try {
			const servers = await this.webrtcService.getTurnServers();
			res.json({ servers, message: 'success' });
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'failed';
			res.json({ servers: [], message: errorMessage });
		}
	}
}
