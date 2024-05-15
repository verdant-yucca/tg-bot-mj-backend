import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import AdminUser from '../models/adminUser';
import jwt from 'jsonwebtoken';
import BadRequestError from '../errors/BadRequestError';
import ConflictError from '../errors/ConflictError';
import { ERROR_BED_REQUEST } from '../utils/constants';

interface BodyParams {
    login: string;
    password: string;
}

export const adminCreate = async (req: Request<any, any, BodyParams>, res: Response, next: NextFunction) => {
    const { login, password } = req.body;
    bcrypt
        .hash(password, 10)
        .then(hash => {
            AdminUser.create({
                login,
                password: hash,
            })
                .then(user => res.send(user))
                .catch(err => {
                    if (err.name === 'ValidationError') {
                        next(new BadRequestError(ERROR_BED_REQUEST.message));
                    } else if (err.code === 11000) {
                        next(new ConflictError('Пользователь с данным логином уже существует'));
                    } else {
                        next(err);
                    }
                });
        })
        .catch(next);
};

export const adminLogin = async (req: Request<any, any, BodyParams>, res: Response, next: NextFunction) => {
    const { login, password } = req.body;
    AdminUser.findOne({ login })
        .select('+password')
        .then((user: { login: string; password: string; _id: string } | null) => {
            if (!user) {
                return Promise.reject(new Error('Неправильные логин или пароль'));
            }
            return bcrypt.compare(password, user.password).then(data => {
                if (!data) {
                    return Promise.reject(new Error('Неправильные логин или пароль'));
                }
                const token = jwt.sign({ _id: user._id }, 'saltsalt', {
                    expiresIn: '1d',
                });
                res.send({ token });
                return user;
            });
        });
};
