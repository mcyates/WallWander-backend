import bcrypt from 'bcryptjs';
import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import uuid from 'uuid';

import { db } from '../database/database';

const upload = multer({
	dest: './uploads/avatars',
	limits: {
		fileSize: 2000000
	},
	fileFilter(req, file, cb) {
		const isImage = /([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png|webP)/g;
		if (isImage.test(file.originalname.toLowerCase()) === false) {
			return cb(new Error('file must be a image'), false);
		}

		cb(null, true);
	}
});

const router: Router = express.Router();

// get all users
router.get(`/users`, async (req: Request, res: Response) => {
	const users = await db.select('*').from('users');
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
});

// login user
router.post(`/users/login`, async (req: Request, res: Response) => {
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
});

// logout user
router.get(`/users/logout`, async (req: Request, res: Response) => {
	if (req.session) {
		req.session = undefined;
		return res.json('Succesfully logged out');
	}
	res.json('already logged out');
});

// delete user
router.delete(`/users/:id`, async (req: Request, res: Response) => {
	const { id } = req.params;

	const user = await db('users')
		.where({ id })
		.del();

	return res.send('res');
});

// upload user avatar
router.post(
	`/users/avatar`,
	upload.single('upload'),
	async (req: Request, res: Response) => {
		res.json(req.file).status(201);
	}
);

export default router;
