import cookieSession from 'cookie-session';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet = require('helmet');
import cors from 'cors';

import * as userController from './controllers/userController';
import * as imageController from './controllers/imageController';
import { initDb } from './database/database';

initDb();

const app = express();

const port = process.env.PORT;
console.log(process.env.PORT);

app.use(cors());

app.use(
	cookieSession({
		secret: `${process.env.SECRET}`
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
app.get(`/users/:id`, userController.getUser);
app.post(`/users/register`, userController.registerUser);
app.post(`/users/login`, userController.loginUser);
app.get(`/users/logout`, userController.logoutUser);
app.delete(`/users/:id`, userController.deleteUser);
// image routes
app.get(`/images`, imageController.getAllImages);
app.get(`/images/:id`, imageController.getImage);
app.post(`/images/upload`, imageController.uploadImage);
app.delete(`/images/:id`, imageController.deleteImage);

app.listen(port, () => {
	console.log(`server running at port ${port}`);
});
