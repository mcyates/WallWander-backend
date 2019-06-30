import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

const app = express();
app.use(bodyParser.json());

// routes

app.get('/users', function(req: Request, res: Response) {
	// here we will have logic to return all users
});

app.get('/users/:id', function(req: Request, res: Response) {
	// here we will have logic to return user by id
});

app.post('/users', function(req: Request, res: Response) {
	// here we will have logic to save a user
});

app.put('/users/:id', function(req: Request, res: Response) {
	// here we will have logic to update a user by a given user id
});

app.delete('/users/:id', function(req: Request, res: Response) {
	// here we will have logic to delete a user by a given user id
});

// start express server
app.listen(3000);

createConnection()
	.then(async (connection) => {})
	.catch((error) => console.log(error));
