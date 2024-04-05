import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import { ERROR_NOT_FOUND, ERROR_BED_REQUEST } from '../utils/constants';
import Package from '../models/package';

interface PostPackagesParams {
    packages: Array<{
        _id?: string;
        name: string;
        price: string;
        count: string;
        title?: string;
        description?: string;
        photoUrl?: string;
        photoWidth?: number;
        photoHeight?: number;
    }>;
}

export const updatePackages = async (req: Request<any, any, PostPackagesParams>, res: Response, next: NextFunction) => {
    const { packages } = req.body;
    try {
        packages?.forEach(({ _id, name, price, count, photoHeight, photoUrl, photoWidth, title, description }) => {
            if (_id) {
                Package.findOneAndUpdate(
                    { _id },
                    {
                        name,
                        price,
                        count,
                        photoHeight,
                        photoUrl,
                        photoWidth,
                        title,
                        description,
                    },
                    { returnDocument: 'after' },
                );
            } else {
                Package.create({ name, price, count, photoHeight, photoUrl, photoWidth, title, description });
            }
        });

        res.send({ result: 'успешно' });
    } catch (e) {
        next(e);
    }
};

export const getPackages = async (req: Request, res: Response, next: NextFunction) => {
    Package.find({})
        .then(packages => {
            if (packages) {
                res.send({ packages });
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
