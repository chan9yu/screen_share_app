import WebSocket from 'ws';
import http from 'http';

export function initializeWebSocket(server: http.Server) {
	const wss = new WebSocket.Server({ server });

	wss.on('connection', socket => {
		socket.on('close', () => {
			console.log('Client disconnected.');
		});

		socket.on('message', message => {
			try {
				const { category, data } = JSON.parse(message.toString());

				switch (category) {
					case 'joinRoom':
						console.log('Handling joinRoom with data:', data);
						socket.send(message);
						break;
					case 'sdp':
						console.log('Handling SDP with data:', data);
						socket.send(message);
						break;
					case 'ice':
						console.log('Handling ICE with data:', data);
						socket.send(message);
						break;
					default:
						console.warn('Unknown category:', category);
				}
			} catch {
				console.error('Invalid message format:', message);
			}
		});
	});
}
