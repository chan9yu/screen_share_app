import { EventEmitter } from 'eventemitter3';

import { RTCPeer } from '../modules';
import { SignalingSocketClient, googleStunServers } from './__private__';

export class MainService extends EventEmitter<'state' | 'media'> {
	private socketClient: SignalingSocketClient | null = null;
	private rtcPeer: RTCPeer | null = null;
	private _roomId = '';

	get roomId() {
		return this._roomId;
	}

	constructor() {
		super();
	}

	public initRTCPeer(options?: RTCConfiguration) {
		if (this.rtcPeer) {
			console.warn('RTCPeer instance already exists.');
			return;
		}

		console.log('init RTCPeer option:', options);

		this.rtcPeer = new RTCPeer({
			...options,
			iceServers: [...googleStunServers, ...(options?.iceServers ?? [])]
		});
		this.initRTCPeerEvents();
	}

	public clearRTCPeer() {
		if (!this.rtcPeer) {
			console.warn('No RTC Manager instance found.');
			return;
		}

		this.rtcPeer.clear();
		this.rtcPeer = null;
	}

	public resetRTCPeer(options?: RTCConfiguration) {
		this.clearRTCPeer();
		this.initRTCPeer(options);
	}

	private initRTCPeerEvents() {
		if (!this.rtcPeer) return;

		this.rtcPeer.on('state', (state: RTCPeerConnectionState) => {
			this.emit('state', { joined: true, connection: state });
		});

		this.rtcPeer.on('ice', (candidate: RTCIceCandidate) => {
			this.sendIce(candidate);
		});

		this.rtcPeer.on('track', (remoteStream: MediaStream) => {
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
			const sdp = await this.rtcPeer?.setRemoteSDP(data);
			sdp && this.sendAnswer(sdp);
		});

		this.socketClient.on('answer', async (data: RTCSessionDescriptionInit) => {
			await this.rtcPeer?.setRemoteSDP(data);
		});

		this.socketClient.on('ice', (data: RTCIceCandidateInit) => {
			this.rtcPeer?.addIceCandidate(data);
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
		this.rtcPeer?.addTrack(stream);
		const sdp = await this.rtcPeer?.createOfferSDP();
		this.socketClient?.sendOffer({ roomId: this._roomId, sdp });
	}

	public sendAnswer(sdp: RTCSessionDescriptionInit) {
		this.socketClient?.sendAnswer({ roomId: this._roomId, sdp });
	}

	public sendIce(candidate: RTCIceCandidate) {
		this.socketClient?.sendIce({ roomId: this._roomId, candidate });
	}
}
