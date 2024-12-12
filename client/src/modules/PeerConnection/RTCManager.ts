import { EventEmitter } from 'eventemitter3';

export class RTCManager extends EventEmitter {
	private peer: RTCPeerConnection | null = null;

	constructor(
		public readonly id: string,
		options?: RTCConfiguration
	) {
		super();
		this.peer = new RTCPeerConnection(options);
		this.initilize();
	}

	private initilize() {
		console.log(`RTCManager initialized, id: ${this.id}`);
		this.initPeerEvents();
	}

	private initPeerEvents() {
		if (!this.peer) return;

		this.peer.onconnectionstatechange = event => {
			console.log('on connection state change', event);
		};

		this.peer.onsignalingstatechange = event => {
			console.log('on signaling state change', event);
		};

		this.peer.onicecandidate = event => {
			console.log('on ice candidate', event);
		};

		this.peer.oniceconnectionstatechange = event => {
			console.log('on ice connection state change', event);
		};

		this.peer.onnegotiationneeded = event => {
			console.log('on negotiation needed', event);
		};

		this.peer.ontrack = event => {
			console.log('on track', event);
		};
	}

	public async createOfferSDP(options?: RTCOfferOptions) {
		if (!this.peer) return null;

		try {
			const offer = await this.peer.createOffer(options);
			this.peer.setLocalDescription(offer);
			return offer;
		} catch (error) {
			console.error('Failed to create or set SDP offer:', error);
			return null;
		}
	}

	public async setRemoteSDP(sdp: RTCSessionDescriptionInit) {
		if (!this.peer) return null;

		try {
			await this.peer.setRemoteDescription(sdp);

			if (sdp.type === 'offer') {
				const answer = await this.peer.createAnswer();
				this.peer.setLocalDescription(answer);
				return answer;
			} else {
				return null;
			}
		} catch (error) {
			console.error('Failed to set remote SDP:', error);
			return null;
		}
	}

	public clear() {
		if (this.peer) {
			this.peer.close();
			this.peer = null;
		}

		this.removeAllListeners();
	}
}