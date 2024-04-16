import { Request, Response, NextFunction } from 'express';
import Transactions from '../models/transactions';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import { ERROR_NOT_FOUND, ERROR_BED_REQUEST } from '../utils/constants';

interface AddNewTransactionBodyParams {
    chatId: string;
    prompt?: string;
    originPrompt?: string;
    waitMessageId?: string;
    action?: string;
    stage?: string;
    midjourneyClientId?: string;
}

interface UpdateTransactionBodyParams {
    _id: string;
    prompt?: string;
    originPrompt?: string;
    midjourneyClientId?: string;
    discordMsgId?: string;
    flags?: string;
    buttons?: string;
    action?: string;
    stage: string;
}

export const addNewTransaction = async (
    req: Request<any, any, AddNewTransactionBodyParams>,
    res: Response,
    next: NextFunction,
) => {
    try {
        Transactions.create(req.body)
            .then(data => {
                res.send(data);
            })
            .catch(() => next(new BadRequestError(ERROR_BED_REQUEST.message)));
    } catch (e) {
        console.error('не удалось сохранить запись', e);
    }
};

export const updateTransaction = async (
    req: Request<any, any, UpdateTransactionBodyParams>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { _id, buttons, flags, discordMsgId, action, stage, prompt, originPrompt, midjourneyClientId } = req.body;
        const currentDate = new Date().toISOString();
        const { dateQuery = new Date(), waitTime = 0 } =
            ((await Transactions.findOne({ _id })) as { dateQuery: Date; waitTime: number } | undefined) || {};
        const leadTime = new Date().getTime() - dateQuery.getTime();
        const isCompleted = stage === 'completed';

        const dataForUpdate = {} as UpdateTransactionBodyParams;
        if (buttons) dataForUpdate.buttons = buttons;
        if (flags) dataForUpdate.flags = flags;
        if (action) dataForUpdate.action = action;
        if (discordMsgId) dataForUpdate.discordMsgId = discordMsgId;
        if (stage) dataForUpdate.stage = stage;
        if (prompt) dataForUpdate.prompt = prompt;
        if (originPrompt) dataForUpdate.originPrompt = originPrompt;
        if (midjourneyClientId) dataForUpdate.midjourneyClientId = midjourneyClientId;

        Transactions.findOneAndUpdate(
            { _id },
            {
                ...dataForUpdate,
                dateUpdate: currentDate,
                waitTime: isCompleted ? waitTime : leadTime,
                leadTime: isCompleted ? leadTime : -1,
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
    } catch (e) {
        console.error('не удалось обновить запись', e);
    }
};

export const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        Transactions.find()
            .then(data => {
                if (data) {
                    res.send({ transactions: data });
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

export const getTransactionsByUserId = async (
    req: Request<any, any, { chatId: string }>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { chatId } = req.body;
        Transactions.find({ chatId })
            .then(data => {
                if (data) {
                    res.send({ transactions: data });
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

export const deleteTransaction = async (req: Request<any, any, { _id: string }>, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.body;

        Transactions.deleteOne({
            _id,
        })
            .then(() => {
                res.send({ result: 'Успешно!' });
            })
            .catch(() => next(new BadRequestError(ERROR_BED_REQUEST.message)));
    } catch (e) {
        console.error('не удалось удалить запись', e);
    }
};
