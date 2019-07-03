import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { db } from '../index';
// import { User } from '../entity/User';

// get all users
export const getAllUsers = async (req: Request, res: Response) => {
	// const users = await getManager().find(User);
	return res.json('users');
};

// get one user by id
export const getUser = async function(req: Request, res: Response) {
	const { id } = req.params;
	// db.select('*').from('users');
	return res.send('users');
};

// register new user
export const registerUser = async function(req: Request, res: Response) {
	const { email, password } = req.body;
	const hash = await bcrypt.hash(password, 10);

	const userInfo = {
		email,
		password
	};

	// const user = await userRepository.create(userInfo);
	// const results = await userRepository.save(user);
	return res.send('res');
};
// login
export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const hash = await bcrypt.hash(password, 10);
	const user = '';
	if (user) {
		// finish login
	}
};

//  update user
export const updateUser = async function(req: Request, res: Response) {
	// const user = await userRepository.findOne(req.params.id);
	// await userRepository.merge(user, req.body);
	// const results = await userRepository.save(user);
	return res.send('res');
};

// delete user
export const deleteUser = async function(req: Request, res: Response) {
	// const results = await userRepository.remove(req.params.id);
	return res.send('res');
};
