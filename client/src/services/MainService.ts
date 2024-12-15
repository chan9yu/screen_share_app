import { SocketManager } from './__private__';

export class MainService {
	private socketManager: SocketManager | null = null;

	constructor() {
		this.connectToWebSocket();
	}

	private initWebSocketEvents() {
		if (!this.socketManager) return;

		// ... event init
	}

	private connectToWebSocket() {
		const url = 'ws://localhost:3036';
		this.socketManager = new SocketManager(url);
		this.socketManager.connect();
		this.initWebSocketEvents();
	}

	public sendJoin(accessCode: string) {
		this.socketManager?.sendJoin({ accessCode });
	}

	public sendLeave(accessCode: string) {
		this.socketManager?.sendLeave({ accessCode });
	}

	public sendOffer(accessCode: string, sdp: any) {
		this.socketManager?.sendOffer({ accessCode, sdp });
	}

	public sendAnswer(accessCode: string, sdp: any) {
		this.socketManager?.sendAnswer({ accessCode, sdp });
	}

	public sendIce(accessCode: string, ice: any) {
		this.socketManager?.sendIce({ accessCode, ice });
	}

	public close() {
		this.socketManager?.disconnect();
	}
}
