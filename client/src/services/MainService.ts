import EventEmitter from 'eventemitter3';
import { SocketManager } from './__private__';

export class MainService extends EventEmitter<'state'> {
	private socketManager: SocketManager | null = null;

	constructor() {
		super();
		this.connectToWebSocket();
	}

	private initWebSocketEvents() {
		if (!this.socketManager) return;

		this.socketManager.on('welcome', () => {
			this.emit('state', { joined: true });
		});
	}

	private connectToWebSocket() {
		const url = 'ws://localhost:3036';
		this.socketManager = new SocketManager(url);
		this.socketManager.connect();
		this.initWebSocketEvents();
	}

	public sendJoin(roomId: string) {
		this.socketManager?.sendJoin({ roomId });
	}

	public sendLeave(roomId: string) {
		this.socketManager?.sendLeave({ roomId });
	}

	public sendOffer(roomId: string, sdp: any) {
		this.socketManager?.sendOffer({ roomId, sdp });
	}

	public sendAnswer(roomId: string, sdp: any) {
		this.socketManager?.sendAnswer({ roomId, sdp });
	}

	public sendIce(roomId: string, ice: any) {
		this.socketManager?.sendIce({ roomId, ice });
	}

	public close() {
		this.socketManager?.disconnect();
	}
}
