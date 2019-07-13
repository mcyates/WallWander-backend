import { Authenticate } from './middleware/auth';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet = require('helmet');
import cors from 'cors';

import userRouter from './controllers/userController';
import imageRouter from './controllers/imageController';
import { initDb } from './database/database';

initDb();

const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(
	cors({
		exposedHeaders: ['authorization']
	})
);

// app.use(Authenticate);
app.use(bodyParser.json());
app.use(userRouter);
app.use(imageRouter);

app.get('/', (req: Request, res: Response) => {
	return res.status(200).json('hello');
});

app.listen(port, () => {
	console.log(`server running at port ${port}`);
});
