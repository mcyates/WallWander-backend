import jwt from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import uuid from 'uuid';

import { Authenticate } from './../middleware/auth';
import { db } from '../database/database';
import imgUpload from '../cloudinary';

const upload = multer({
	dest: './uploads',
	limits: {
		fileSize: 10000000
	},
	fileFilter(req, file, cb) {
		const isImage = /\.(?:jpg|jpeg|gif|png|webP)/g;
		if (isImage.test(file.originalname.toLowerCase()) === false) {
			return cb(new Error('file must be a image'), false);
		}

		cb(null, true);
	}
});

export const router = express.Router();

// get all images
router.get(`/images`, async (req: Request, res: Response) => {
	const images = await db.select('*').from('images');
	return res.json(images);
});

// get image by id
router.get(`/images/:id`, async (req: Request, res: Response) => {
	const { id } = req.params;
	const image = await db
		.select('*')
		.from('images')
		.where({ id });
	console.log(image);
	await db('images')
		.where({ id })
		.increment('views', 1)
		.catch((e) => console.log(e));
	return res.json(image);
});

// upload new image
router.post(
	`/images/upload`,
	Authenticate,
	upload.single('wallpaper'),
	async (req: any, res: Response) => {
		const { authorization } = req.headers;
		let authorId = await jwt.verify(authorization, `${process.env.SECRET}`);
		const id = await uuid.v4();

		await imgUpload(req.file).then((image) => {
			const { url, secureUrl, width, height, format, title } = image;
			db('images')
				.insert({
					id,
					url,
					secureUrl,
					title,
					width,
					height,
					format,
					views: 0,
					authorId
				})
				.returning('*')
				.then(async (image) => {
					const img = image[0];
					res.status(201).json(img);
				});
		});
	},
	(error: Error, req: Request, res: Response, next: NextFunction) => {
		res.status(400).json({ error: error.message });
	}
);

// delete image by id
router.delete(`/images/:id`, async (req: Request, res: Response) => {
	const { id } = req.params;

	const image = await db('images')
		.where({ id })
		.del();

	return res.send(image);
});

export default router;
