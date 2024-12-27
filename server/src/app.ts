import cors from 'cors';
import express, { Application } from 'express';
import 'dotenv/config';

import { roomRouter } from './routes/room.routes';
import { webrtcRouter } from './routes/webrtc.routes';

export const app: Application = express();

// added base middleware
app.use(cors());
app.use(express.json());

// router connection
app.use('/rooms', roomRouter);
app.use('/webrtc', webrtcRouter);
