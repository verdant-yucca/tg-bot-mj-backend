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
    _id?: string;
    flag?: string;
    button?: string;
}
export const queries = async (req: Request<any, any, BodyParams>, res: Response, next: NextFunction) => {
    const { chatId, prompt, _id, button, flag } = req.body;
    const foundQuery = await Query.findOne({ _id });
    const currentDate = new Date().toISOString();

    if (foundQuery) {
        Query.findOneAndUpdate(
            { _id },
            {
                prompt,
                currentDate,
                flag,
                button
            },
        )
            .then(query => {
                if (query) {
                    res.send({ query });
                } else {
                    throw new NotFoundError(ERROR_NOT_FOUND.messageUser);
                }
            })
            .catch(err => {
                if (err.name === 'ValidationError' || err.name === 'CastError') {
                    next(new BadRequestError(ERROR_BED_REQUEST.message));
                } else {
                    next(err);
                }
            });
    } else {
        Query.create({
            chatId,
            prompt,
        })
            .then(data => {
                res.send(data);
            })
            .catch(() => next(new BadRequestError(ERROR_BED_REQUEST.message)));
    }
};
