import express, { NextFunction } from 'express';

export const Authenticate = (req: any, res: any, next: NextFunction) => {
	// console.log(req.session);
	res.status(403).json('not permitted');
	return;
};
