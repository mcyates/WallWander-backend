import { Authenticate } from './../middleware/auth';
import bcrypt from 'bcryptjs';
import express, { Request, Response, Router, NextFunction } from 'express';
import uuid from 'uuid';

import { db } from '../database/database';
import { generateToken, findByToken } from '../utils/auth';

const router: Router = express.Router();

// get all users
router.get(`/users`, Authenticate, async (req: Request, res: Response) => {
	const users = await db.select('id').from('users');
	return res.json(users);
});

// get one user by id
router.get(`/users/:id`, async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = await db
		.select('id')
		.from('users')
		.where({ id });
	return res.send('users');
});

// register user
router.post(`/users/register`, async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const id = await uuid.v4();

	const hash = await bcrypt.hash(password, 10);

	db('users')
		.insert({
			id,
			hash,
			uploads: 0,
			email
		})
		.returning('*')
		.then(async (user) => {
			const { id, email, name } = user[0];
			const token = await generateToken(id);
			const userInfo = {
				email,
				id
			};
			res.header('authorization', `${token}`).json(userInfo);
		});
});

// login user
router.post(`/users/login`, async (req: Request, res: Response) => {
	const { email, password } = req.body;

	return db
		.select('*')
		.from('users')
		.where('email', '=', email)
		.then(async (user) => {
			const { hash, email, name, id } = user[0];

			const isValid = await bcrypt.compare(password, hash);

			if (isValid) {
				const token = await generateToken(id);
				let userInfo = {
					email,
					id,
					name
				};

				res.header('authorization', `${token}`).json(userInfo);
			} else {
				res.status(400).json('Invalid credentials');
			}
		})
		.catch((e) => res.status(404).json('User not found'));
});

// set Username
router.post('/users/name', Authenticate, (req: Request, res: Response) => {
	const { name, email } = req.body;
	console.log(name, email);

	return db('users')
		.where({ email })
		.update({ name: name })
		.then(() => {
			res.status(201).json(name);
		})
		.catch((e) => res.status(404).json('user not found'));
});

// logout user
router.get(
	`/users/logout`,
	Authenticate,
	async (req: Request, res: Response) => {
		res.json('already logged out');
	}
);

// delete user
router.delete(
	`/users/:id`,
	Authenticate,
	async (req: Request, res: Response) => {
		const { Authorization } = req.headers;
		const authId = findByToken(`${Authorization}`);

		const { id } = req.params;

		const user = await db('users')
			.where({ id })
			.del();

		return res.send('res');
	}
);

export default router;
