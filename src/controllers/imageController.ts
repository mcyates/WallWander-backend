import { Authenticate } from './../middleware/auth';
import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import uuid from 'uuid';

import { db } from '../database/database';

const upload = multer({
	dest: './uploads/wallpapers',
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
		.select('id')
		.from('images')
		.where({ id });
	return res.send(image);
});

// upload new image
router.post(
	`/images/upload`,
	Authenticate,
	upload.single('upload'),
	async (req: any, res: Response) => {
		const id = await uuid.v4();
		console.log(req.file);

		res.json(req.file).status(201);
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
