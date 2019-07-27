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

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, x-auth'
	);
	res.header('Access-Control-Expose-Headers', 'x-auth');
	next();
});

const corsOptions = {
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
