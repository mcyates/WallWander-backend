import jwt from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import uuid from 'uuid';
// @ts-ignore
import setUpPaginator from 'knex-paginator';

import { Authenticate } from '../middleware/auth';
import { db } from '../database/database';
import imgUpload, { imgDelete } from '../cloudinary';

setUpPaginator(db);

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
	if (req.query.limit && req.query.page) {
		const limit = req.query.limit || 5;
		const page = parseFloat(req.query.page) + 1 || 1;
		const images = await db
			.select('*')
			.from('images')
			// @ts-ignore
			.paginate(limit, page, true);
		return res.json(images);
	}
	return res.status(400).json('missing query parameters');
});

// get a users uploads
router.get(`/images/uploads/:id`, async (req: Request, res: Response) => {
	const { id } = req.params;
	if (req.query.limit && req.query.page) {
		const limit = req.query.limit || 5;
		const page = parseFloat(req.query.page) + 1 || 1;
		const images = await db
			.select('*')
			.from('images')
			.where({ authorId: id })
			// @ts-ignore
			.paginate(limit, page, true);
		return res.json(images);
	}
	return res.status(400).json('missing query parameters');
});

// get image by id
router.get(`/images/:id`, async (req: Request, res: Response) => {
	const { id } = req.params;
	let data: any = await db
		.select('*')
		.from('images')
		.where({ id });
	await db('images')
		.where({ id })
		.increment('views', 1)
		.catch((e) => console.log(e));
	const image = data[0];

	const author = await db
		.select('name')
		.from('users')
		.where({ id: image.authorId });
	image.authorName = author[0].name;
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
					authorId
				})
				.returning('*')
				.then(async (image) => {
					const img = image[0];
					await db('users')
						.where({ id: authorId })
						.increment('uploads', 1);
					res.status(201).json(img);
				})
				.catch((e) => console.log(e));
		});
	},
	(error: Error, req: Request, res: Response, next: NextFunction) => {
		res.sendStatus(400).json({ error: error.message });
	}
);

// favorite an image
router.post('/images/:id/favorite', async (req: Request, res: Response) => {
	const imageId = req.params.id;
	const { userId } = req.body;
	const id = uuid.v4();
	await db('favorites')
		.insert({
			id,
			userId,
			imageId
		})
		.catch((e) => {
			res.status(404).json(e);
		});

	res.status(200).json('success');
});

// delete image by id
router.delete(`/images/:id`, async (req: Request, res: Response) => {
	const { id } = req.params;

	const image: any = await db('images').where({ id });
	await db('images')
		.where({ id })
		.del();
	await db('users')
		.where({ id: image[0].authorId })
		.decrement('uploads', 1);
	imgDelete(image[0].title);
	return res.json(image[0]);
});

export default router;
