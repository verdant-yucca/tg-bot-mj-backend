import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../errors/BadRequestError';
import { ERROR_BED_REQUEST } from '../utils/constants';
import YandexTranslate from '../utils/YandexTranslate';

interface GetTranslateBodyParams {
    text: string;
    targetLanguageCode: string;
}

export const getTranslate = async (
    req: Request<any, any, GetTranslateBodyParams>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { text, targetLanguageCode } = req.body;
        const translate = await YandexTranslate.getTranslate(text, targetLanguageCode);
        res.send({ text: translate.translations[0].text });
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
