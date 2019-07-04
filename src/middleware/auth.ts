import express, { NextFunction } from 'express';

export const requireAuth = (req: any, res: any, next: NextFunction) => {
	if (req.session && req.session.id) {
		next();
		return;
	}
	res.status(403).json('not permitted');
};
