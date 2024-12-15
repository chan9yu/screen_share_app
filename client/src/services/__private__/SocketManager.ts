import { EventEmitter } from 'eventemitter3';
import { io, Socket } from 'socket.io-client';

type EventTypes = 'connect' | 'disconnect' | 'welcome' | 'offer' | 'answer' | 'ice';

export class SocketManager extends EventEmitter<EventTypes> {
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
		console.log('🔌 Socket connection closed.');
	}

	public sendJoin(data: { roomId: string }) {
		this.sendMessage('join', data);
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

	public sendIce(data: { roomId: string; ice: RTCIceCandidate }) {
		this.sendMessage('ice', data);
	}

	private initSocketEvents() {
		if (!this.socket) return;

		this.socket.on('connect', () => {
			this.emit('connect');
			console.log('Connected to WebSocket server');
		});

		this.socket.on('disconnect', () => {
			this.emit('disconnect');
			console.log('Disconnected from WebSocket server');
		});

		this.socket.on('welcome', () => {
			this.emit('welcome');
			console.log('Welcome message received from server');
		});

		this.socket.on('offer', data => {
			this.emit('offer', data);
			console.log('Offer received:', data);
		});

		this.socket.on('answer', data => {
			this.emit('answer', data);
			console.log('Answer received:', data);
		});

		this.socket.on('ice', data => {
			this.emit('ice', data);
			console.log('ICE candidate received:', data);
		});
	}

	private sendMessage(event: string, data: object) {
		if (!this.socket) {
			console.error('Socket is not connected.');
			return;
		}

		this.socket.emit(event, data);
		console.log(`Message sent to event '${event}':`, data);
	}
}
