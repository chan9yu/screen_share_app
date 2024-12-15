import { Server } from 'socket.io';
import http from 'node:http';

export const createSocketServer = (server: http.Server) => {
	const io = new Server(server, {
		cors: {
			origin: '*',
			methods: ['GET', 'POST']
		}
	});

	io.on('connection', socket => {
		const userId = socket.id;

		socket.on('join', data => {
			const { accessCode } = data;
			socket.join(accessCode);
			socket.to(accessCode).emit('welcome', { userId, accessCode });
		});

		socket.on('leave', data => {
			const { accessCode } = data;
			socket.leave(accessCode);
			socket.to(accessCode).emit('leave', { userId, accessCode });
		});

		socket.on('offer', data => {
			const { accessCode, sdp } = data;
			socket.to(accessCode).emit('offer', sdp);
		});

		socket.on('answer', data => {
			const { accessCode, sdp } = data;
			socket.to(accessCode).emit('answer', sdp);
		});

		socket.on('ice', data => {
			const { accessCode, ice } = data;
			socket.to(accessCode).emit('ice', ice);
		});

		socket.on('disconnect', () => {
			console.log('user disconnected');
		});
	});
};
