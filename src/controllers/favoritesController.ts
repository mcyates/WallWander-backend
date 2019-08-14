import express, { Request, Response, NextFunction } from 'express';
import uuid from 'uuid';

import { Authenticate } from '../middleware/auth';
import { db } from '../database/database';

export const router = express.Router();

// get favorite status of currently viewed image
router.post('/favorite/:id/status', (req: Request, res: Response) => {
	res.status(200).json('favorited?: ');
});

// favorite an image
router.post('/image/:id/favorite', async (req: Request, res: Response) => {
	const imageId = req.params.id;
	const { userId } = req.body;
	// const id = uuid.v4();
	await db('favorites')
		.insert({
			// id,
			userId,
			imageId
		})
		.catch((e) => {
			res.status(404).json(e);
		});

	res.status(200).json('success');
});

export default router;
