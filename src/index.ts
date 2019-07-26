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

const whitelist = ['mattcyates.com', 'www.mattcyates.com'];

const corsOptions = {
	origin: function(origin: any, callback: any) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	exposedHeaders: ['authorization']
};

app.use(cors(corsOptions));
app.use(helmet());

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
