import express, { NextFunction } from 'express';
import { findByToken } from '../utils/auth';

export const Authenticate = (req: any, res: any, next: NextFunction) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json('unauthorized');
	}
	const user = findByToken(authorization);
	if (!user) {
		return res.status(401).json('User does not exist');
	}
	next();
	return;
};
