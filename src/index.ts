import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

createConnection()
	.then(async (connection) => {})
	.catch((error) => console.log(error));

const app = express();
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
	return res.status(200).json('hello');
});

export const router = express.Router();

app.listen(3000);
