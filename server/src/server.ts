import http from 'http';

import { app } from './app';
import { initializeWebSocket } from './websocket';

const PORT = process.env.PORT || 3036;
const server = http.createServer(app);

initializeWebSocket(server);

server.listen(PORT, () => {
	console.log(`✅ Server is running on http://localhost:${PORT}`);
});
