import axiosCall from 'axios';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../errors/BadRequestError';
import { ERROR_BED_REQUEST } from '../utils/constants';

dotenv.config();

const filePath = process.env.CONTENT_PATH || '';
const botUrl = process.env.BOT_URL || '';

export const getContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jsonString = fs.readFileSync(filePath, 'utf-8');
        res.send(JSON.parse(jsonString));
    } catch (e) {
        console.log(e);
        const error = e as unknown as Error;
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            next(new BadRequestError(ERROR_BED_REQUEST.message));
        } else {
            next(error);
        }
    }
};

export const updateContent = async (req: Request<any, any, any>, res: Response, next: NextFunction) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(req.body, null, 4), 'utf-8');
        await axiosCall({
            method: 'GET',
            url: `${botUrl}/updateText`,
        });
        res.send({ result: 'Успешно' });
    } catch (e) {
        console.log(e);
        const error = e as unknown as Error;
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            next(new BadRequestError(ERROR_BED_REQUEST.message));
        } else {
            next(error);
        }
    }
};
