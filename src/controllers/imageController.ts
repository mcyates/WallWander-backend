import { Request, Response } from 'express';
import uuid from 'uuid';

import { db } from '../database/database';

// get all images
export const getAllImages = async (req: Request, res: Response) => {
	const images = await db.select('*').from('images');
	return res.json(images);
};

export const getImage = async (req: Request, res: Response) => {
	const { id } = req.params;
	const image = await db
		.select('id')
		.from('images')
		.where({ id });
	return res.send(image);
};

export const uploadImage = async (req: any, res: Response) => {
	const id = await uuid.v4();
	console.log(req.file);
	res.json(req.file).status(201);
};

export const deleteImage = async (req: Request, res: Response) => {
	const { id } = req.params;

	const image = await db('images')
		.where({ id })
		.del();

	return res.send(image);
};
