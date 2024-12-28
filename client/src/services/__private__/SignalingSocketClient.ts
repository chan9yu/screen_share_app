import { EventEmitter } from 'eventemitter3';
import { io, Socket } from 'socket.io-client';

type EventTypes = 'connect' | 'disconnect' | 'welcome' | 'leave' | 'offer' | 'answer' | 'ice';

export class SignalingSocketClient extends EventEmitter<EventTypes> {
	private socket: Socket | null = null;

	constructor(private readonly socketUrl: string) {
		super();
	}

	public connect() {
		if (this.socket) {
			console.warn('Socket already connected.');
			return;
		}

		this.socket = io(this.socketUrl, {
			transports: ['websocket'],
			reconnection: true,
			reconnectionAttempts: 5
		});

		this.initSocketEvents();
	}

	public disconnect() {
		if (!this.socket) {
			console.warn('Socket is not connected.');
			return;
		}

		this.socket.disconnect();
		this.socket = null;
	}

	public sendJoin(data: { roomId: string }) {
		this.sendMessage('join', data);
	}

	public sendWelcome(data: { roomId: string; userId: string }) {
		this.sendMessage('welcome', data);
	}

	public sendLeave(data: { roomId: string }) {
		this.sendMessage('leave', data);
	}

	public sendOffer(data: { roomId: string; sdp: any }) {
		this.sendMessage('offer', data);
	}

	public sendAnswer(data: { roomId: string; sdp: any }) {
		this.sendMessage('answer', data);
	}

	public sendIce(data: { roomId: string; candidate: RTCIceCandidate }) {
		this.sendMessage('ice', data);
	}

	private initSocketEvents() {
		if (!this.socket) return;

		this.socket.on('connect', () => {
			this.emit('connect');
		});

		this.socket.on('disconnect', () => {
			this.emit('disconnect');
		});

		this.socket.on('leave', () => {
			this.emit('leave');
		});

		this.socket.on('welcome', data => {
			console.log('[SignalingSocketClient] <<< Recv welcome', data);
			this.sendWelcome({ roomId: data.roomId, userId: data.userId });
			this.emit('welcome', data);
		});

		this.socket.on('offer', data => {
			console.log('[SignalingSocketClient] <<< Recv offer', data);
			this.emit('offer', data);
		});

		this.socket.on('answer', data => {
			console.log('[SignalingSocketClient] <<< Recv answer', data);
			this.emit('answer', data);
		});

		this.socket.on('ice', data => {
			console.log('[SignalingSocketClient] <<< Recv ice', data);
			this.emit('ice', data);
		});
	}

	private sendMessage(event: string, data: object) {
		if (!this.socket) return;
		console.log('[SignalingSocketClient] >>> Send', event, data);
		this.socket.emit(event, data);
	}
}
