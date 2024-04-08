import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import { ERROR_NOT_FOUND, ERROR_BED_REQUEST } from '../utils/constants';
import Package from '../models/package';

interface PostPackagesParams {
    _id?: string;
    name: string;
    price: string;
    count: string;
    title?: string;
    description?: string;
    photoUrl?: string;
    photoWidth?: number;
    photoHeight?: number;
}

export const updatePackages = async (req: Request<any, any, PostPackagesParams>, res: Response, next: NextFunction) => {
    const { _id, name, price, count, photoHeight, photoUrl, photoWidth, title, description } = req.body;
    try {
        if (_id) {
            const dataForUpdate = {} as Record<string, any>;
            if (name) dataForUpdate.name = name;
            if (price) dataForUpdate.price = price;
            if (count) dataForUpdate.count = count;
            if (photoHeight) dataForUpdate.photoHeight = photoHeight;
            if (photoUrl) dataForUpdate.photoUrl = photoUrl;
            if (photoWidth) dataForUpdate.photoWidth = photoWidth;
            if (title) dataForUpdate.title = title;
            if (description) dataForUpdate.description = description;

            Package.findOneAndUpdate({ _id }, dataForUpdate, { returnDocument: 'after' }).then(() => {
                res.send({ result: 'успешно' });
            });
        } else {
            Package.create({ name, price, count, photoHeight, photoUrl, photoWidth, title, description }).then(() => {
                res.send({ result: 'не успешно' });
            });
        }
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
