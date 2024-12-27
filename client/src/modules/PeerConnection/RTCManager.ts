import { EventEmitter } from 'eventemitter3';

export class RTCManager extends EventEmitter<'state' | 'ice' | 'track'> {
	private peer: RTCPeerConnection | null = null;

	constructor(options?: RTCConfiguration) {
		super();
		this.initilize(options);
	}

	private initilize(options?: RTCConfiguration) {
		console.log('[RTCManager] initilize peer connection');
		this.peer = new RTCPeerConnection(options);
		this.initPeerEvents();
	}

	private initPeerEvents() {
		if (!this.peer) return;

		this.peer.onconnectionstatechange = () => {
			console.log('[RTCManager] Connection State Changed:', this.peer?.connectionState);
			this.emit('state', this.peer?.connectionState);
		};

		this.peer.onsignalingstatechange = () => {
			console.log('[RTCManager] Signaling State Changed:', this.peer?.signalingState);
		};

		this.peer.onicecandidate = event => {
			const candidate = event.candidate;
			if (candidate) {
				console.log('[RTCManager] New ICE Candidate');
				this.emit('ice', candidate);
			} else {
				console.log('[RTCManager] All ICE candidates have been sent.');
			}
		};

		this.peer.oniceconnectionstatechange = () => {
			console.log('[RTCManager] ICE Connection State:', this.peer?.iceConnectionState);
		};

		this.peer.onnegotiationneeded = () => {
			console.log('[RTCManager] Negotiation Needed...');
		};

		this.peer.ontrack = event => {
			const [remoteStream] = event.streams;
			console.log('[RTCManager] Remote Track Added:', remoteStream);
			this.emit('track', remoteStream);
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
		console.log('[RTCManager] Adding ICE Candidate');
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
