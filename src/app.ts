import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import cron from 'node-cron';
import cors from './middlewares/cors';
import centralizedError from './middlewares/centralizedError';
import { requestLogger, errorLogger } from './middlewares/logger';
import router from './routes/routes';
import { updateCountFreeQueriesForAllUsers } from './cron/updateCountFreeQueriesForAllUsers';

dotenv.config();

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/tg-bot-mj'); // localhost || 127.0.0.1
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors);
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: 'tmp',
    }),
);

cron.schedule('0 0 * * *', async () => {
    try {
        updateCountFreeQueriesForAllUsers('10');
    } catch (e) {
        console.log(e);
    }
});

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(centralizedError);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
