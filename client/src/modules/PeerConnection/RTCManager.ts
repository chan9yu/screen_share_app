import { EventEmitter } from 'eventemitter3';

export class RTCManager extends EventEmitter<'ice' | 'remote_stream'> {
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
			event.candidate && this.emit('ice', event.candidate);
		};

		this.peer.oniceconnectionstatechange = event => {
			console.log('on ice connection state change', event);
		};

		this.peer.onnegotiationneeded = event => {
			console.log('on negotiation needed', event);
		};

		this.peer.ontrack = event => {
			const [remoteStream] = event.streams;
			this.emit('remote_stream', remoteStream);
		};
	}

	public addTrack(stream: MediaStream) {
		if (!this.peer) return;

		stream.getTracks().forEach(track => {
			this.peer?.addTrack(track, stream);
		});
	}

	public removeTrack() {
		if (!this.peer) return;

		this.peer.getSenders().forEach(sender => {
			if (sender.track) {
				sender.track.stop();
			}
			this.peer?.removeTrack(sender);
		});
	}

	public addIceCandidate(candidate: RTCIceCandidateInit) {
		if (!this.peer) return;
		this.peer.addIceCandidate(candidate);
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
			this.removeTrack();
			this.peer.close();
			this.peer = null;
		}

		this.removeAllListeners();
	}
}
