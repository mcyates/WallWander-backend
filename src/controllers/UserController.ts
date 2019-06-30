import { router } from '..';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { User } from '../entity/User';

const basePath = '/users';

const connection = getConnection();
const userRepository = connection.getRepository(User);

router.get(basePath, async (req: Request, res: Response) => {
	const users = await userRepository.find();
	res.json(users);
});

router.get(`${basePath}/:id`, async function(req: Request, res: Response) {
	const results = await userRepository.findOne(req.params.id);
	return res.send(results);
});

router.post(basePath, async function(req: Request, res: Response) {
	// here we will have logic to save a user
	const user = await userRepository.create(req.body);
	const results = await userRepository.save(user);
	return res.send(results);
});

router.put(`${basePath}/:id`, async function(req: Request, res: Response) {
	const user = await userRepository.findOne(req.params.id);
	await userRepository.merge(user, req.body);
	const results = await userRepository.save(user);
	return res.send(results);
});

router.delete(`${basePath}/:id`, async function(req: Request, res: Response) {
	const results = await userRepository.remove(req.params.id);
	return res.send(results);
});
