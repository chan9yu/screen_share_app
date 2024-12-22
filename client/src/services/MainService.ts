import { EventEmitter } from 'eventemitter3';

import { SocketManager } from './__private__';
import { RTCManager } from '../modules';
import { iceServers } from './servers';

export class MainService extends EventEmitter<'state' | 'media'> {
	private socketManager: SocketManager | null = null;
	private rtcManager: RTCManager | null = null;
	private _roomId = '';

	get roomId() {
		return this._roomId;
	}

	constructor() {
		super();
		this.rtcManager = new RTCManager('mainService', { iceServers });
		this.initRTCManagerEvents();
	}

	private initRTCManagerEvents() {
		if (!this.rtcManager) return;

		this.rtcManager.on('ice', (candidate: RTCIceCandidate) => {
			this.sendIce(candidate);
		});

		this.rtcManager.on('remote_stream', (remoteStream: MediaStream) => {
			this.emit('media', { remoteStream });
		});
	}

	private initWebSocketEvents() {
		if (!this.socketManager) return;

		this.socketManager.on('welcome', data => {
			this._roomId = data.roomId;
			this.emit('state', { joined: true });
		});

		this.socketManager.on('leave', () => {
			this.emit('state', { joined: false });
		});

		this.socketManager.on('disconnect', () => {
			this.emit('state', { joined: false });
		});

		this.socketManager.on('offer', async (data: RTCSessionDescriptionInit) => {
			const sdp = await this.rtcManager?.setRemoteSDP(data);
			sdp && this.sendAnswer(sdp);
		});

		this.socketManager.on('answer', async (data: RTCSessionDescriptionInit) => {
			await this.rtcManager?.setRemoteSDP(data);
		});

		this.socketManager.on('ice', (data: RTCIceCandidateInit) => {
			this.rtcManager?.addIceCandidate(data);
		});
	}

	public connectToSocket() {
		const url = `ws://${window.location.hostname}:3036`;
		this.socketManager = new SocketManager(url);
		this.socketManager.connect();
		this.initWebSocketEvents();
	}

	public closeSocket() {
		this.socketManager?.disconnect();
		this.socketManager = null;
	}

	public reconnectSocket() {
		this.closeSocket();
		this.connectToSocket();
	}

	public sendJoin(roomId: string) {
		this.socketManager?.sendJoin({ roomId });
	}

	public sendLeave() {
		this.socketManager?.sendLeave({ roomId: this._roomId });
	}

	public async sendOffer(stream: MediaStream) {
		this.rtcManager?.addMediaStream(stream);
		const sdp = await this.rtcManager?.createOfferSDP();
		this.socketManager?.sendOffer({ roomId: this._roomId, sdp });
	}

	public sendAnswer(sdp: RTCSessionDescriptionInit) {
		this.socketManager?.sendAnswer({ roomId: this._roomId, sdp });
	}

	public sendIce(candidate: RTCIceCandidate) {
		this.socketManager?.sendIce({ roomId: this._roomId, candidate });
	}
}
