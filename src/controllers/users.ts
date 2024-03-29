import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import { ERROR_NOT_FOUND, ERROR_BED_REQUEST } from '../utils/constants';

interface BodyParams {
    chatId: string;
    languageCode?: any;
    username?: string;
    firstName: string;
    lastName?: string;
    avatarPath?: string;
    countQueries?: string;
    countFreeQueries?: string;
}
export const login = async (req: Request<any, any, BodyParams>, res: Response, next: NextFunction) => {
    const { chatId, languageCode, username, firstName, lastName, avatarPath, countFreeQueries, countQueries } =
        req.body;
    const foundUser = await User.findOne({ chatId });
    const currentDate = new Date().toISOString();
    console.log('foundUser', foundUser);

    if (foundUser) {
        User.findOneAndUpdate(
            { chatId },
            {
                languageCode,
                username,
                firstName,
                lastName,
                avatarPath,
                lastAuth: currentDate,
                countFreeQueries,
                countQueries,
            },
            { returnDocument: 'after' },
        )
            .then(user => {
                if (user) {
                    res.send({ user });
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
        const createDate = currentDate;
        const lastAuth = currentDate;

        User.create({
            chatId,
            languageCode,
            username,
            firstName,
            lastName,
            avatarPath,
            createDate,
            lastAuth,
            countQueries: 0,
            countFreeQueries: 0,
        })
            .then(user => res.send({ user }))
            .catch(err => {
                if (err.name === 'ValidationError') {
                    next(new BadRequestError(ERROR_BED_REQUEST.message));
                } else {
                    next(err);
                }
            });
    }
};

interface GetUsersBodyParams {
    page: string;
    pageSize: string;
}

export const getUsers = (req: Request<any, any, GetUsersBodyParams>, res: Response, next: NextFunction) => {
    const { page, pageSize } = req.body;
    User.find({})
        .skip((+page - 1) * +pageSize)
        .limit(+pageSize)
        .then(users => res.send({ users }))
        .catch(next);
};
