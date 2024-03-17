import { Request, Response, NextFunction } from 'express';

const allowedCors = [
    'https://verdant-yucca.ru',
    'http://verdant-yucca.ru',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3010',
];

const cors = (req: Request, res: Response, next: NextFunction) => {
    const { origin } = req.headers;
    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
    const requestHeaders = req.headers['access-control-request-headers'];

    if (origin && allowedCors.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
    }

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
        res.header('Access-Control-Allow-Headers', requestHeaders);
        return res.end();
    }
    return next();
};

export default cors;
