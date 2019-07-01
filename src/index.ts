import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import * as userController from './controllers/userController';

createConnection()
	.then(async (connection) => {})
	.catch((error) => console.log(error));

const app = express();
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
	return res.status(200).json('hello');
});

// primary routes
app.get(`/users`, userController.getAllUsers);
app.get(`/users/:id`, userController.getUser);
app.post(`/users/register`, userController.registerUser);
app.put(`/users/:id`, userController.updateUser);
app.delete(`/users/:id`, userController.deleteUser);
app.listen(3000);
