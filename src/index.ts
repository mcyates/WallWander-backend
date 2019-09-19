import { Authenticate } from './middleware/auth';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet = require('helmet');
import cors from 'cors';

import favoritesRouter from './controllers/favoritesController';
import imageRouter from './controllers/ImageController';
import searchRouter from './controllers/searchController';
import tagsRouter from './controllers/tagsController';
import userRouter from './controllers/UserController';
import { initDb } from './database/database';

initDb();

const app = express();
const port = process.env.PORT || 4000;

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, authorization'
	);
	res.header('Access-Control-Expose-Headers', 'authorization');
	next();
});

const corsOptions = {
	exposedHeaders: ['authorization']
};

app.use(cors(corsOptions));
app.use(helmet());

app.use(bodyParser.json());

app.use(favoritesRouter);
app.use(imageRouter);
app.use(searchRouter);
app.use(tagsRouter);
app.use(userRouter);

app.get('/', (req: Request, res: Response) => {
	return res.status(200).json('hello');
});

app.listen(port, () => {
	console.log(`server running at port ${port}`);
});

export default app;
