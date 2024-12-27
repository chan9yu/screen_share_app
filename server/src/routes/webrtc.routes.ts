import { Router } from 'express';
import { WebRTCController } from '../controllers/webrtc.controller';

const webrtcController = new WebRTCController();

export const webrtcRouter = Router();

webrtcRouter.get('/turn', webrtcController.getTurnServer.bind(webrtcController));
