import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import { ERROR_NOT_FOUND, ERROR_BED_REQUEST } from '../utils/constants';
import AccountMidjourney from '../models/accountMidjourney';

interface CreateAvailableAccountMidjourneyBodyParams {
    name: string;
    customId: string;
    status: string;
    ServerId: string;
    ChannelId: string;
    DiscordToken: string;
}

interface UpdateAvailableAccountMidjourneyBodyParams {
    _id: string;
    name: string;
    customId: string;
    status: string;
    ServerId: string;
    ChannelId: string;
    DiscordToken: string;
}

export const createAvailableAccountMidjourney = async (
    req: Request<any, any, CreateAvailableAccountMidjourneyBodyParams>,
    res: Response,
    next: NextFunction,
) => {
    try {
        AccountMidjourney.create(req.body)
            .then(data => {
                res.send(data);
            })
            .catch(() => next(new BadRequestError(ERROR_BED_REQUEST.message)));
    } catch (e) {
        console.error('не удалось сохранить запись', e);
    }
};

export const updateAvailableAccountMidjourney = async (
    req: Request<any, any, UpdateAvailableAccountMidjourneyBodyParams>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { _id } = req.body;

        AccountMidjourney.findOneAndUpdate(
            { _id },
            {
                ...req.body,
            },
        )
            .then(data => {
                if (data) {
                    res.send(data);
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
        console.error('не удалось обновить запись', e);
    }
};

export const getAvailableAccountMidjourney = async (req: Request, res: Response, next: NextFunction) => {
    try {
        AccountMidjourney.find()
            .then(data => {
                if (data) {
                    res.send({ accounts: data });
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
        console.error('не удалось получить запись', e);
    }
};
