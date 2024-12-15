import { Router } from 'express';
import { RoomController } from '../controllers/room.controller';

const roomController = new RoomController();

export const roomRouter = Router();

roomRouter.get('/create', roomController.createRoom);
roomRouter.post('/close', roomController.closeRoom);
