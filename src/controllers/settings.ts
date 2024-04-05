import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import { ERROR_NOT_FOUND, ERROR_BED_REQUEST } from '../utils/constants';
import Settings from '../models/settings';

interface PostSettingParams {
    _id?: string;
    styles: Array<{ name: string; value: string; url: string }>;
    sizes: Array<{ name: string; value: string; url: string }>;
}

export const updateSettings = async (req: Request<any, any, PostSettingParams>, res: Response, next: NextFunction) => {
    const { styles, sizes, _id } = req.body;
    try {
        if (_id) {
            Settings.findOneAndUpdate(
                { _id },
                {
                    styles,
                    sizes,
                },
                { returnDocument: 'after' },
            );
        } else {
            Settings.create({ styles, sizes });
        }

        res.send({ result: 'успешно' });
    } catch (e) {
        next(e);
    }
};

export const getSettings = async (req: Request, res: Response, next: NextFunction) => {
    Settings.find({})
        .then(settings => {
            if (settings) {
                res.send({ _id: settings[0]._id, styles: settings[0].styles, sizes: settings[0].sizes });
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
