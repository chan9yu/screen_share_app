import { Request, Response } from 'express';
import { RoomService } from '../services/room.service';

export class RoomController {
	private roomService = new RoomService();

	public async createRoom(req: Request, res: Response) {
		try {
			const roomId = this.roomService.createRoom();
			res.status(201).json({ roomId });
		} catch {
			res.status(500).json({ error: 'Failed to create room' });
		}
	}

	public async closeRoom(req: Request, res: Response) {
		const { roomId } = req.body;

		if (roomId) {
			const result = this.roomService.closeRoom(roomId);
			if (result) {
				res.json({ message: `Room ${roomId} closed.` });
			} else {
				res.status(404).json({ error: 'Room not found' });
			}
		} else {
			res.status(400).json({ error: 'Room ID is required' });
		}
	}
}
