import cors from 'cors';
import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();
const PORT = process.env.PORT || 3036;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello, Screen Share App!');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', socket => {
	console.log('Client connected.');

	socket.on('close', () => {
		console.log('Client disconnected.');
	});

	socket.on('message', message => {
		console.log('Message from client:', message);
	});

	socket.send('Test message from server.');

	socket.send(JSON.stringify({ name: 'changyu' }));
});

server.listen(PORT, () => {
	console.log(`✅ Screen Share App is ready and listening on: http://localhost:${PORT}`);
});
