import formidable from 'formidable';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Image } from '../entity/Image';

const imageRepository = getRepository(Image);

// get all images
export const getAllImages = async (req: Request, res: Response) => {
	const images = await imageRepository.find();
	return res.json(images);
};

export const getImage = async (req: Request, res: Response) => {
	const results = await imageRepository.findOne(req.params.id);
	return res.send(results);
};

export const uploadImage = async (req: Request, res: Response) => {
	const form = new formidable.IncomingForm();

	form.parse(req);

	form.on('fileBegin', (name, file) => {
		file.path = `${__dirname}/uploads/${file.name}`;
	});

	form.on('file', (name, file) => {
		console.log(`Uploaded ${file.name}`);
	});
};

export const deleteImage = async (req: Request, res: Response) => {
	const results = await imageRepository.remove(req.params.id);
	return res.send(results);
};
