import cors from 'cors';
import express, { Application } from 'express';

import { roomRouter } from './routes/room.routes';

export const app: Application = express();

// added base middleware
app.use(cors());
app.use(express.json());

// router connection
app.use('/rooms', roomRouter);
