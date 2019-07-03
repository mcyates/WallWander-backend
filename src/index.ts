import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg';
import knex from 'knex';

import * as userController from './controllers/userController';
import * as imageController from './controllers/imageController';
import helmet = require('helmet');

export const db = knex({
	client: 'pg',
	connection: {
		host: process.env.POSTGRES_HOST,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB
	}
});

db.schema.createTable('users', (table) => {
	table
		.uuid('id')
		.primary()
		.unique();
	table
		.string('email')
		.unique()
		.notNullable();
	table.string('password').notNullable();
	table.timestamp('createdAt').defaultTo(db.fn.now());
});

db.schema.createTable('images', (table) => {
	table
		.uuid('id')
		.primary()
		.unique();
	table.string('title');
	table.string('resolution');
	table.bigInteger('views');
	table.timestamp('createdAt').defaultTo(db.fn.now());
	table.uuid('authorId').references('users.id');
});

const app = express();

app.use(cors());
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
app.put(`/users/:id`, userController.updateUser);
app.delete(`/users/:id`, userController.deleteUser);
// image routes
app.get(`/images`, imageController.getAllImages);
app.get(`/images/:id`, imageController.getImage);
app.post(`/images/upload`, imageController.uploadImage);
app.delete(`/images/:id`, imageController.deleteImage);

app.listen(3000);
