import { EventEmitter } from 'eventemitter3';

import { RTCManager } from '../modules';
import { SignalingSocketClient, googleStunServers } from './__private__';

export class MainService extends EventEmitter<'state' | 'media'> {
	private socketClient: SignalingSocketClient | null = null;
	private rtcManager: RTCManager | null = null;
	private _roomId = '';

	get roomId() {
		return this._roomId;
	}

	constructor() {
		super();
	}

	public initRTCManager(options?: RTCConfiguration) {
		if (this.rtcManager) {
			console.warn('RTC Manager instance already exists.');
			return;
		}

		console.log('init RTCManager option:', options);

		this.rtcManager = new RTCManager({
			...options,
			iceServers: [...googleStunServers, ...(options?.iceServers ?? [])]
		});
		this.initRTCManagerEvents();
	}

	public clearRTCManager() {
		if (!this.rtcManager) {
			console.warn('No RTC Manager instance found.');
			return;
		}

		this.rtcManager.clear();
		this.rtcManager = null;
	}

	public resetRTCManager(options?: RTCConfiguration) {
		this.clearRTCManager();
		this.initRTCManager(options);
	}

	private initRTCManagerEvents() {
		if (!this.rtcManager) return;

		this.rtcManager.on('state', (state: RTCPeerConnectionState) => {
			this.emit('state', { joined: true, connection: state });
		});

		this.rtcManager.on('ice', (candidate: RTCIceCandidate) => {
			this.sendIce(candidate);
		});

		this.rtcManager.on('track', (remoteStream: MediaStream) => {
			this.emit('media', { remoteStream });
		});
	}

	private initWebSocketEvents() {
		if (!this.socketClient) return;

		this.socketClient.on('welcome', data => {
			this._roomId = data.roomId;
			this.emit('state', { joined: true });
		});

		this.socketClient.on('leave', () => {
			this.emit('state', { joined: false });
		});

		this.socketClient.on('disconnect', () => {
			this.emit('state', { joined: false });
		});

		this.socketClient.on('offer', async (data: RTCSessionDescriptionInit) => {
			const sdp = await this.rtcManager?.setRemoteSDP(data);
			sdp && this.sendAnswer(sdp);
		});

		this.socketClient.on('answer', async (data: RTCSessionDescriptionInit) => {
			await this.rtcManager?.setRemoteSDP(data);
		});

		this.socketClient.on('ice', (data: RTCIceCandidateInit) => {
			this.rtcManager?.addIceCandidate(data);
		});
	}

	public connectToSocket() {
		const url = `ws://${window.location.hostname}:3036`;
		this.socketClient = new SignalingSocketClient(url);
		this.socketClient.connect();
		this.initWebSocketEvents();
	}

	public closeSocket() {
		this.socketClient?.disconnect();
		this.socketClient = null;
	}

	public reconnectSocket() {
		this.closeSocket();
		this.connectToSocket();
	}

	public sendJoin(roomId: string) {
		this.socketClient?.sendJoin({ roomId });
	}

	public sendLeave() {
		this.socketClient?.sendLeave({ roomId: this._roomId });
	}

	public async sendOffer(stream: MediaStream) {
		this.rtcManager?.addTrack(stream);
		const sdp = await this.rtcManager?.createOfferSDP();
		this.socketClient?.sendOffer({ roomId: this._roomId, sdp });
	}

	public sendAnswer(sdp: RTCSessionDescriptionInit) {
		this.socketClient?.sendAnswer({ roomId: this._roomId, sdp });
	}

	public sendIce(candidate: RTCIceCandidate) {
		this.socketClient?.sendIce({ roomId: this._roomId, candidate });
	}
}
