import formidable from 'formidable';
import { Request, Response } from 'express';

import { Image } from '../entity/Image';


// get all images
export const getAllImages = async (req: Request, res: Response) => {
	// const images = await imageRepository.find();
	return res.json('images');
};

export const getImage = async (req: Request, res: Response) => {
	// const results = await imageRepository.findOne(req.params.id);
	return res.send('');
};

export const uploadImage = async (req: Request, res: Response) => {
	const form = new formidable.IncomingForm();

	form.parse(req);

	form.on('fileBegin', (name: any, file: { path: string; name: any; }) => {
		file.path = `${__dirname}/uploads/${file.name}`;
	});

	form.on('file', (name: any, file: { name: any; }) => {
		console.log(`Uploaded ${file.name}`);
	});
};

export const deleteImage = async (req: Request, res: Response) => {
	// const results = await imageRepository.remove(req.params.id);
	return res.send('a');
};
