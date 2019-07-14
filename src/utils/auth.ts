import jwt from 'jsonwebtoken';
import db from '../database/database';

export const generateToken = async (id: string) => {
	const payload = id;
	console.log(payload);
	const token = await jwt.sign(payload, `${process.env.SECRET}`);
	return token;
};

export const findByToken = async (token: string) => {
	console.log(token);
	if (token) {
		let decoded = await jwt.verify(token, `${process.env.SECRET}`);

		const user = await db
			.select('*')
			.from('users')
			.where('id', '=', `${decoded}`);

		return user;
	}
};
