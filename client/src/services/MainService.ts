import { parseMessage } from '../utils';

export class MainService {
	private websocket: WebSocket | null = null;

	constructor() {
		this.connectToWebSocket();
	}

	private onWebsocketOpen = () => {
		console.log('onWebsocketOpen');
	};

	private onWebsocketMessage = (event: MessageEvent) => {
		const message = parseMessage(event.data);
		console.log('Received message:', message);
	};

	private onWebsocketClose = () => {
		console.warn('WebSocket connection closed');
	};

	private onWebsocketError = () => {
		console.error('WebSocket error occurred');
	};

	private initWebSocketEvents() {
		if (!this.websocket) return;

		this.websocket.onopen = this.onWebsocketOpen.bind(this);
		this.websocket.onmessage = this.onWebsocketMessage.bind(this);
		this.websocket.onclose = this.onWebsocketClose.bind(this);
		this.websocket.onerror = this.onWebsocketError.bind(this);
	}

	private connectToWebSocket() {
		const url = 'ws://localhost:3036';
		this.websocket = new WebSocket(url);
		this.initWebSocketEvents();
	}
}
