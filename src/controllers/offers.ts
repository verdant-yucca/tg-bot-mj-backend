import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import { ERROR_NOT_FOUND, ERROR_BED_REQUEST } from '../utils/constants';
import Offer from '../models/offer';

interface PostPackagesParams {
    _id: string;
    name: string;
    factor: string;
    dateStart: string;
    dateEnd: string;
}

export const updateOffers = async (req: Request<any, any, PostPackagesParams>, res: Response, next: NextFunction) => {
    const { _id, name, factor, dateStart, dateEnd } = req.body;

    try {
        if (_id) {
            Offer.findOneAndUpdate(
                { _id },
                {
                    name,
                    factor,
                    dateStart: dateStart ? new Date(dateStart).toLocaleDateString() : '',
                    dateEnd: dateEnd ? new Date(dateEnd).toLocaleDateString() : '',
                },
            ).then(() => {
                res.send({ result: 'успешно' });
            });
        } else {
            Offer.create({
                name,
                factor,
                dateStart: dateStart ? new Date(dateStart).toLocaleDateString() : '',
                dateEnd: dateEnd ? new Date(dateEnd).toLocaleDateString() : '',
            }).then(() => {
                res.send({ result: 'успешно' });
            });
        }
    } catch (e) {
        next(e);
    }
};

export const getOffers = async (req: Request, res: Response, next: NextFunction) => {
    Offer.find({})
        .then(offers => {
            if (offers) {
                res.send(offers);
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
