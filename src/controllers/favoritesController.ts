import express, { Request, Response, NextFunction } from 'express';

import { Authenticate } from '../middleware/auth';
import { db } from '../database/database';

export const router = express.Router();

// get favorite status of currently viewed image
router.get(
	'/favorite/:imageId',
	Authenticate,
	async (req: Request, res: Response) => {
		const { imageId } = req.params;

		const { userId } = req.query;
		const data: any = await db('favorites')
			.where({
				userId,
				imageId
			})
			.catch((e) => {
				res.status(409).json(e.detail);
			});
		const status = !!data[0].imageId === true && !!data[0].userId === true;
		res.status(200).json(status);
	}
);

// favorite an image
router.post(
	'/favorite/:imageId',
	Authenticate,
	async (req: Request, res: Response) => {
		const { imageId } = req.params;

		const { userId } = req.body;
		await db('favorites').insert({
			userId,
			imageId
		});
		// .catch((e) => {
		// 	res.status(409).json(e.detail);
		// });

		return res.status(201).json('success');
	}
);

// unfavorite an image
router.delete(
	'/favorite/:imageId',
	Authenticate,
	async (req: Request, res: Response) => {
		const { imageId } = req.params;
		const { userId } = req.query;

		await db('favorites')
			.where({
				userId,
				imageId
			})
			.del();
		// .catch((e) => {
		// 	res.status(409).json(e.detail);
		// });

		return res.status(204).json();
	}
);

export default router;
