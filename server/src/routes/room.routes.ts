import { Router } from 'express';
import { RoomController } from '../controllers/room.controller';

const roomController = new RoomController();

export const roomRouter = Router();

roomRouter.post('/validate', roomController.validateRoom.bind(roomController));
roomRouter.post('/create', roomController.createRoom.bind(roomController));
roomRouter.post('/close', roomController.closeRoom.bind(roomController));
