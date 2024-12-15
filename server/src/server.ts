import http from 'node:http';

import { app } from './app';
import { createSocketServer } from './websocket/socket-io';

const PORT = process.env.PORT || 3036;
const server = http.createServer(app);

createSocketServer(server);

server.listen(PORT, () => {
	console.log(`✅ Server is running on http://localhost:${PORT}`);
});
