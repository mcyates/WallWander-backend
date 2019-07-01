import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import * as userController from './controllers/userController';
import * as imageController from './controllers/imageController';

createConnection()
	.then(async (connection) => {})
	.catch((error) => console.log(error));

const app = express();
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
	return res.status(200).json('hello');
});

// primary routes
// user routes
app.get(`/users`, userController.getAllUsers);
app.get(`/users/:id`, userController.getUser);
app.post(`/users/register`, userController.registerUser);
app.put(`/users/:id`, userController.updateUser);
app.delete(`/users/:id`, userController.deleteUser);
// image routes
app.get(`/images`, imageController.getAllImages);
app.get(`/images/:id`, imageController.getImage);
app.post(`/images/upload`, imageController.uploadImage);
app.delete(`/images/:id`, imageController.deleteImage);

app.listen(3000);
