import { Request, Response } from 'express';
import { RoomService } from '../services/room.service';

export class RoomController {
	private roomService = new RoomService();

	public async validateRoom(req: Request, res: Response) {
		const { roomId } = req.body;

		if (!roomId) {
			return res.json({ success: false, message: 'Room Id is required.' });
		}

		const result = this.roomService.validateRoom(roomId);

		if (result) {
			return res.json({ success: true, message: 'Room Id is valid.' });
		} else {
			return res.json({ success: false, message: 'Room Id not found.' });
		}
	}

	public async createRoom(req: Request, res: Response) {
		try {
			const roomId = this.roomService.createRoom();
			res.json({ roomId });
		} catch {
			res.json({ error: 'Failed to create room' });
		}
	}

	public async closeRoom(req: Request, res: Response) {
		const { roomId } = req.body;

		if (roomId) {
			const result = this.roomService.closeRoom(roomId);
			if (result) {
				res.json({ message: 'Room closed.' });
			} else {
				res.json({ error: 'Room not found' });
			}
		} else {
			res.json({ error: 'Room Id is required' });
		}
	}
}
