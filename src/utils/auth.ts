import jwt from 'jsonwebtoken';
import db from '../database/database';

export const generateToken = async (id: string) => {
	const payload = id;
	const token = await jwt.sign(payload, `${process.env.SECRET}`);
	return token;
};

export const findByToken = async (token: string) => {
	console.log(token);
	if (token) {
		const tokenArr = token.split(' ');
		const payload = tokenArr[1];
		let decoded = await jwt.verify(payload, `${process.env.SECRET}`);

		const user = await db
			.select('*')
			.from('users')
			.where('id', '=', `${decoded}`);

		return user;
	}
};
