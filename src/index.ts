import cookieSession from 'cookie-session';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg';
import knex from 'knex';

import * as userController from './controllers/userController';
import * as imageController from './controllers/imageController';
import helmet = require('helmet');
import { requireAuth } from './middleware/auth';

export const db = knex({
	client: 'pg',
	connection: {
		host: 'localhost',
		user: 'postgres',
		password: 'docker',
		database: 'postgres'
	}
});

const app = express();

app.use(cors());

app.use(
	cookieSession({
		// keys: ['authtastic']
		secret: 'authtastic'
	})
);
app.use(helmet());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
	return res.status(200).json('hello');
});

// primary routes
// user routes
app.get(`/users`, userController.getAllUsers);
app.get(`/users/:id`, requireAuth, userController.getUser);
app.post(`/users/register`, userController.registerUser);
app.post(`/users/login`, userController.loginUser);
app.put(`/users/:id`, requireAuth, userController.updateUser);
app.delete(`/users/:id`, requireAuth, userController.deleteUser);
// image routes
app.get(`/images`, imageController.getAllImages);
app.get(`/images/:id`, imageController.getImage);
app.post(`/images/upload`, requireAuth, imageController.uploadImage);
app.delete(`/images/:id`, requireAuth, imageController.deleteImage);

app.listen(3000);
