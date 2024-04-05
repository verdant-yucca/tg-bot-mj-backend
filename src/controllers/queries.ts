import { Request, Response, NextFunction } from 'express';
import Query from '../models/query';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import { ERROR_NOT_FOUND, ERROR_BED_REQUEST } from '../utils/constants';

interface SaveQueryBodyParams {
    chatId: string;
    queryId: string;
    prompt: string;
    originPrompt?: string;
    waitMessageId?: string;
    action?: string;
    stage?: string;
    midjourneyClientId?: string;
    leadTime?: number;
    waitTime?: number;
    buttons?: string;
    flags?: string;
    discordMsgId?: string;
}

interface UpdateQueryBodyParams {
    _id: string;
    queryId: string;
    discordMsgId?: string;
    flags?: string;
    buttons?: string;
    action?: string;
    stage?: string;
    midjourneyClientId?: string;
    leadTime?: number;
    waitTime?: number;
}

interface GetQueryBodyParams {
    queryId: string;
}

interface GetQueriesBodyParams {
    dateStart: string;
    dateEnd: string;
}

interface FindOutstandingQueryBodyParams {
    action: string;
}

export const saveQuery = async (req: Request<any, any, SaveQueryBodyParams>, res: Response, next: NextFunction) => {
    Query.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(() => next(new BadRequestError(ERROR_BED_REQUEST.message)));
};

export const updateQuery = async (req: Request<any, any, UpdateQueryBodyParams>, res: Response, next: NextFunction) => {
    const { _id, queryId, buttons, flags, discordMsgId, action, stage, midjourneyClientId, leadTime, waitTime } =
        req.body;
    const currentDate = new Date().toISOString();
    const updatedData = {} as any;
    if (queryId) updatedData.queryId = queryId;
    if (buttons) updatedData.buttons = buttons;
    if (flags) updatedData.flags = flags;
    if (discordMsgId) updatedData.discordMsgId = discordMsgId;
    if (action) updatedData.action = action;
    if (stage) updatedData.stage = stage;
    if (midjourneyClientId) updatedData.midjourneyClientId = midjourneyClientId;
    if (leadTime) updatedData.leadTime = leadTime;
    if (waitTime) updatedData.waitTime = waitTime;

    Query.findOneAndUpdate(
        { queryId },
        {
            ...updatedData,
            dateUpdate: currentDate,
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
};

export const getQuery = async (req: Request<any, any, GetQueryBodyParams>, res: Response, next: NextFunction) => {
    const { queryId } = req.body;

    Query.findOne({ queryId })
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
