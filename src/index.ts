import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet = require('helmet');
import cors from 'cors';
import cookieSession from 'cookie-session';

import userRouter from './controllers/userController';
import imageRouter from './controllers/imageController';
import { initDb } from './database/database';

initDb();

const app = express();
const port = process.env.PORT || 4000;

app.use(
	cors({
		exposedHeaders: ['x-auth']
	})
);
app.use(
	cookieSession({
		name: 'session',
		secret: 'secretasdq12'
	})
);
app.use(bodyParser.json());
app.use(userRouter);
app.use(imageRouter);

app.use(helmet());

app.get('/', (req: Request, res: Response) => {
	return res.status(200).json('hello');
});

app.listen(port, () => {
	console.log(`server running at port ${port}`);
});
