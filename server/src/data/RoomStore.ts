class RoomStore {
	private static instance: RoomStore;
	private rooms: Set<string>;

	private constructor() {
		this.rooms = new Set<string>();
	}

	public static getInstance() {
		if (!RoomStore.instance) {
			RoomStore.instance = new RoomStore();
		}

		return RoomStore.instance;
	}

	public addRoom(roomId: string) {
		this.rooms.add(roomId);
	}

	public removeRoom(roomId: string) {
		return this.rooms.delete(roomId);
	}

	public getRooms() {
		return Array.from(this.rooms);
	}

	public hasRoom(roomId: string) {
		return this.rooms.has(roomId);
	}
}

export const roomStore = RoomStore.getInstance();
