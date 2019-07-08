import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import uuid from 'uuid';

import { db } from '../database/database';

// get all users
export const getAllUsers = async (req: Request, res: Response) => {
	const users = await db.select('*').from('users');
	return res.json(users);
};

// get one user by id
export const getUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = await db
		.select('id')
		.from('users')
		.where({ id });
	return res.send('users');
};

// register new user
export const registerUser = async (req: Request, res: Response) => {
	console.log(req.body);
	const { email, userName, password } = req.body;
	const name = userName;

	const id = await uuid.v4();

	const hash = await bcrypt.hash(password, 10);

	db.transaction((trx) => {
		trx
			.insert({
				id,
				hash,
				name,
				email
			})
			.into('users')
			.returning('id')
			.then((user) => {
				req.session = { id: user[0] };
				res.json(user[0]);
			})
			.then(trx.commit)
			.catch(trx.rollback);
	});
};
// login
export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const hash = await bcrypt.hash(password, 10);

	const isValid = await bcrypt.compare(password, hash);
	if (isValid) {
		return db
			.select('*')
			.from('users')
			.where('email', '=', email)
			.then((user) => {
				req.session = { id: user[0] };
				res.json(user[0].id);
			})
			.catch((e) => res.status(400).json('User not found'));
		// finish login
	} else {
		res.status(400).json('Invalid credentials');
	}
};

//  update user
export const logoutUser = async (req: Request, res: Response) => {
	if (req.session) {
		req.session = undefined;
		return res.json('Succesfully logged out');
	}
	res.json('already logged out');
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	const user = await db('users')
		.where({ id })
		.del();

	return res.send('res');
};

export const uploadAvatar = async (req: Request, res: Response) => {
	res.json(req.file).status(201);
};
