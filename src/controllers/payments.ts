import { Request, Response, NextFunction } from 'express';
import Payments from '../models/payments';

interface NewPaymentParams {
    userId: string;
    name?: string;
    price?: string;
    count?: string;
}

export const newPayment = async (req: Request<any, any, NewPaymentParams>, res: Response, next: NextFunction) => {
    const { name, userId, price, count } = req.body;
    try {
        Payments.create({ name, userId, price, count });

        res.send({ result: 'успешно' });
    } catch (e) {
        next(e);
    }
};

export const getPayments = async (req: Request<any, any, any>, res: Response, next: NextFunction) => {
    try {
        Payments.find(payments => {
            res.send({ payments: payments });
        });
    } catch (e) {
        next(e);
    }
};
