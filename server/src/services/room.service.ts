import { roomStore } from '../data/RoomStore';

export class RoomService {
	public validateRoom(roomId: string) {
		return roomStore.hasRoom(roomId);
	}

	public createRoom() {
		let roomId: string;
		do {
			roomId = Math.floor(100000 + Math.random() * 900000).toString();
		} while (roomStore.hasRoom(roomId));
		roomStore.addRoom(roomId);
		return roomId;
	}

	public closeRoom(roomId: string) {
		if (roomStore.hasRoom(roomId)) {
			roomStore.removeRoom(roomId);
			return true;
		}
		return false;
	}
}
