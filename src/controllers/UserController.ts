import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import { User } from '../entity/User';

const connection = getConnection();
const userRepository = connection.getRepository(User);

// get all users

export const getAllUsers = async (req: Request, res: Response) => {
	const users = await userRepository.find();
	return res.json(users);
};

// get one user by id
export const getUser = async function(req: Request, res: Response) {
	const results = await userRepository.findOne(req.params.id);
	return res.send(results);
};

// register new user
export const registerUser = async function(req: Request, res: Response) {
	const { userName, email, password } = req.body;
	const hash = await bcrypt.hash(password, 10);

	const userInfo = {
		userName,
		email,
		password
	};

	const user = await userRepository.create(userInfo);
	const results = await userRepository.save(user);
	return res.send(results);
};

//  update user
export const updateUser = async function(req: Request, res: Response) {
	const user = await userRepository.findOne(req.params.id);
	await userRepository.merge(user, req.body);
	const results = await userRepository.save(user);
	return res.send(results);
};

// delete user
export const deleteUser = async function(req: Request, res: Response) {
	const results = await userRepository.remove(req.params.id);
	return res.send(results);
};
