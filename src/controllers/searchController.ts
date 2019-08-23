import express, { Request, Response } from 'express';
// @ts-ignore
import setUpPaginator from 'knex-paginator';

import { Authenticate } from '../middleware/auth';
import { db } from '../database/database';

setUpPaginator(db);

export const router = express.Router();

router.get('/search/', async (req: Request, res: Response) => {
	let { tags, nsfw } = req.query;
	const limit = req.query.limt || 5;
	const page = parseFloat(req.query.page) + 1 || 1;

	tags = tags.split('+');

	const tagExists = await db('tags')
		.select('*')
		.whereIn('tag', [...tags])
		.then((rows) => {
			if (rows.length === 0) {
				return false;
			}
			return true;
		})
		.catch((e) => res.status(400).json(e.detail));

	if (tagExists) {
		await db('tags')
			.select(['id', 'tag'])
			.whereIn('tag', [...tags])
			.then(async (data) => {
				const ids = data.map(({ id }) => id);
				const tags = data.map(({ tag }) => tag);

				const imgs = await db
					.select(['imageId as id', 'secureUrl', 'height', 'width', 'views'])
					.from('images')
					.innerJoin('images_tags', 'images.id', 'images_tags.imageId')
					.whereIn('images_tags.tagId', [...ids])
					// @ts-ignore
					.paginate(limit, page, true);
				// .catch((e) => res.status(404).json(e.datail));
				const result = {
					imgs,
					tags
				};
				res.json(result);
			})
			.catch((e) => res.status(400).json(e));
	} else {
		res.status(404).json('tags not found');
	}
});

export default router;
