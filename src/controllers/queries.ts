import { Request, Response, NextFunction } from 'express';
import Query from '../models/query';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import { ERROR_NOT_FOUND, ERROR_BED_REQUEST } from '../utils/constants';

interface SaveQueryBodyParams {
    chatId: string;
    prompt: string;
}

interface UpdateQueryBodyParams {
    _id: string;
    discordMsgId: string;
    flags: string;
    buttons: string;
    action: string;
}

interface GetQueryBodyParams {
    _id: string;
}

interface GetQueriesBodyParams {
    dateStart: string;
    dateEnd: string;
}

interface FindOutstandingQueryBodyParams {
    action: string;
}

export const saveQuery = async (req: Request<any, any, SaveQueryBodyParams>, res: Response, next: NextFunction) => {
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

export const updateQuery = async (req: Request<any, any, UpdateQueryBodyParams>, res: Response, next: NextFunction) => {
    const { _id, buttons, flags, discordMsgId, action } = req.body;
    const currentDate = new Date().toISOString();
    const { dateQuery } = (await Query.findOne({ _id })) as { dateQuery: Date };
    const leadTime = new Date().getTime() - dateQuery.getTime();

    Query.findOneAndUpdate(
        { _id },
        {
            buttons,
            flags,
            action,
            discordMsgId,
            dateUpdate: currentDate,
            leadTime,
        },
    )
        .then(data => {
            if (data) {
                res.send({ _id: data._id });
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
};

export const getQuery = async (req: Request<any, any, GetQueryBodyParams>, res: Response, next: NextFunction) => {
    const { _id } = req.body;

    Query.findOne({ _id })
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
};

export const getQueries = async (req: Request<any, any, GetQueriesBodyParams>, res: Response, next: NextFunction) => {
    const { dateStart, dateEnd } = req.body;

    Query.find({ dateQuery: { $gte: new Date(dateStart).getTime(), $lte: new Date(dateEnd).getTime() } })
        .then(queries => {
            if (queries) {
                res.send({ queries });
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
};

export const findOutstandingQuery = async (
    req: Request<any, any, FindOutstandingQueryBodyParams>,
    res: Response,
    next: NextFunction,
) => {
    const { action } = req.body;

    Query.findOne({
        action,
        dateUpdate: { $exists: true, $ne: null },
    })
        .then(data => {
            console.log('data', data);
            if (data) {
                res.send({ result: true });
            } else {
                res.send({ result: false });
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError' || err.name === 'CastError') {
                next(new BadRequestError(ERROR_BED_REQUEST.message));
            } else {
                next(err);
            }
        });
};
