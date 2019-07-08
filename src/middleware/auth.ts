import express, { NextFunction } from 'express';

export const requireAuth = (req: any, res: any, next: NextFunction) => {
	console.log(req.session);
	if (req.session && req.session.id) {
		next();
		return;
	} else {
		res.status(403).json('not permitted');
	}
};
