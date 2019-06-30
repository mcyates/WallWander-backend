import * as express from 'express';
import { Request, Response } from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

createConnection()
	.then(async (connection) => {})
	.catch((error) => console.log(error));
