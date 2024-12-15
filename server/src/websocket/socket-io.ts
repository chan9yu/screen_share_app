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
			const { roomId } = data;
			socket.join(roomId);
			socket.to(roomId).emit('welcome', { userId, roomId });
		});

		socket.on('leave', data => {
			const { roomId } = data;
			socket.leave(roomId);
			socket.to(roomId).emit('leave', { userId, roomId });
		});

		socket.on('offer', data => {
			const { roomId, sdp } = data;
			socket.to(roomId).emit('offer', sdp);
		});

		socket.on('answer', data => {
			const { roomId, sdp } = data;
			socket.to(roomId).emit('answer', sdp);
		});

		socket.on('ice', data => {
			const { roomId, ice } = data;
			socket.to(roomId).emit('ice', ice);
		});

		socket.on('disconnect', () => {
			console.log(`User ${userId} disconnected`);
		});
	});
};
