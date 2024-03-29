import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import { ERROR_NOT_FOUND, ERROR_BED_REQUEST } from '../utils/constants';
import Package from '../models/package';

interface PostPackagesParams {
    packages: {
        _id?: string;
        name: string;
        price: string;
        count: string;
    }[];
}

export const updatePackages = async (req: Request<any, any, PostPackagesParams>, res: Response, next: NextFunction) => {
    const { packages } = req.body;
    try {
        packages?.forEach(({ _id, name, price, count }) => {
            if (_id) {
                Package.findOneAndUpdate(
                    { _id },
                    {
                        name,
                        price,
                        count,
                    },
                );
            } else {
                Package.create({ name, price, count });
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
                res.send(packages);
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
