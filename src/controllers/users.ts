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
    lastAuth?: string;
    left?: boolean;
    selectedStyle?: string;
    selectedSize?: string;
    payments?: Array<{ count: string; date: string; price: string }>;
}

export const login = async (req: Request<any, any, BodyParams>, res: Response, next: NextFunction) => {
    const {
        chatId,
        languageCode,
        username,
        firstName,
        lastName,
        avatarPath,
        countFreeQueries,
        countQueries,
        left,
        payments,
        selectedStyle,
        selectedSize,
    } = req.body;
    const foundUser = await User.findOne({ chatId });
    const currentDate = new Date().toISOString();

    const updatedUserFields = {} as BodyParams;
    updatedUserFields.lastAuth = currentDate;
    if (typeof languageCode !== 'undefined') updatedUserFields.languageCode = languageCode;
    if (typeof username !== 'undefined') updatedUserFields.username = username;
    if (typeof firstName !== 'undefined') updatedUserFields.firstName = firstName;
    if (typeof lastName !== 'undefined') updatedUserFields.lastName = lastName;
    if (typeof avatarPath !== 'undefined') updatedUserFields.languageCode = languageCode;
    if (typeof countFreeQueries !== 'undefined') updatedUserFields.countFreeQueries = countFreeQueries;
    if (typeof countQueries !== 'undefined') updatedUserFields.countQueries = countQueries;
    if (typeof left !== 'undefined') updatedUserFields.left = left;
    if (typeof selectedStyle !== 'undefined') updatedUserFields.selectedStyle = selectedStyle;
    if (typeof selectedSize !== 'undefined') updatedUserFields.selectedSize = selectedSize;

    if (foundUser) {
        if (foundUser.payments && payments) {
            updatedUserFields.payments = [...foundUser.payments, ...payments];
            updatedUserFields.countQueries = (Number(foundUser.countQueries) + Number(payments[0].count)).toString();
        } else if (!foundUser.payments && payments) {
            updatedUserFields.payments = [...payments];
            updatedUserFields.countQueries = (
                (Number(foundUser.countQueries) || 0) + Number(payments[0].count)
            ).toString();
        }
        User.findOneAndUpdate({ chatId }, updatedUserFields, { returnDocument: 'after' })
            .then(user => {
                if (user) {
                    res.send(user);
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
            languageCode: languageCode || 'ru',
            username,
            firstName,
            lastName,
            avatarPath,
            createDate,
            lastAuth,
            countQueries: 0,
            countFreeQueries,
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

interface GetUserByIdParams {
    chatId: string;
}

export const getUserById = async (req: Request<any, any, GetUserByIdParams>, res: Response, next: NextFunction) => {
    try {
        const { chatId } = req.body;
        User.findOne({ chatId })
            .then(user => {
                if (user) {
                    res.send(user);
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
    } catch (e) {
        console.error(e);
        next(e);
    }
};

interface writeOffRequestFromUserParams {
    chatId: string;
}

export const writeOffRequestFromUser = async (
    req: Request<any, any, writeOffRequestFromUserParams>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { chatId } = req.body;
        User.findOne({ chatId })
            .then(async user => {
                if (user) {
                    if (user.countFreeQueries && +user.countFreeQueries > 0) {
                        user.countFreeQueries = (+user.countFreeQueries - 1).toString();
                    } else if (user.countQueries && +user.countQueries > 0) {
                        user.countQueries = (+user.countQueries - 1).toString();
                    } else if (user.countQueries && +user.countQueries < 1) {
                        //это пусть тут будет до тех пор пока не подключим платёжку, чтобы можно было делать запросы "в долг"
                        user.countQueries = (+user.countQueries - 1).toString();
                    } else if (!user.countQueries) {
                        user.countQueries = String(0);
                    }

                    const updatedUser = await user.save();

                    res.send(updatedUser);
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
    } catch (e) {
        console.error(e);
        next(e);
    }
};

interface GetUsersBodyParams {
    page?: string;
    pageSize?: string;
}

export const getUsers = (req: Request<any, any, GetUsersBodyParams>, res: Response, next: NextFunction) => {
    const { page, pageSize } = req.body;
    if (typeof page !== 'undefined' && typeof pageSize !== 'undefined') {
        User.find({})
            .skip((+page - 1) * +pageSize)
            .limit(+pageSize)
            .then(users => res.send({ users }))
            .catch(next);
    } else {
        User.find({})
            .then(users => res.send({ users }))
            .catch(next);
    }
};

interface updateCountFreeQueriesForAllUsersBodyParams {
    count?: string;
}

export const updateCountFreeQueriesForAllUsers = async (
    req: Request<any, any, updateCountFreeQueriesForAllUsersBodyParams>,
    res: Response,
    next: NextFunction,
) => {
    const { count } = req.body;
    try {
        const allUsers = await User.find();
        allUsers.forEach(async user => {
            try {
                if ('countFreeQueries' in user) {
                    user.countFreeQueries = count;
                    await user.save();
                }
            } catch (e) {
                console.error('Не удалось обновить значение у юзера: ', user._id);
            }
        });
        res.send({ result: 'Успешно' });
    } catch (e) {
        console.error('Обновление бесплытных запросов не выполнено!');
        next(e);
    }
};
