import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Query from '../models/query';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import { ERROR_NOT_FOUND, ERROR_BED_REQUEST } from '../utils/constants';

interface BodyParams {
    chatId: string;
    prompt: string;
}
export const queries = async (req: Request<any, any, BodyParams>, res: Response, next: NextFunction) => {
    const { chatId, prompt } = req.body;

    Query.create({
        chatId,
        prompt,
    })
        .then(data => {
            res.send(data);
        })
        .catch(() => next(new BadRequestError(ERROR_BED_REQUEST.message)));
};
