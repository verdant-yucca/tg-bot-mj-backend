import { ERROR_INTERNAL_SERVER } from '../utils/constants';
import { NextFunction, Request, Response } from 'express';

interface CustomError {
    statusCode: number;
    message: string;
}
const centralizedError = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const { statusCode = ERROR_INTERNAL_SERVER.code, message } = err;
    res.status(statusCode).send({
        message: statusCode === ERROR_INTERNAL_SERVER.code ? ERROR_INTERNAL_SERVER.message : message,
    });
    next();
};

export default centralizedError;
