import express from 'express';
import {
    login,
    getUsers,
    getUserById,
    writeOffRequestFromUser,
    updateCountFreeQueriesForAllUsers,
} from '../controllers/users';
import { findOutstandingQuery, getQuery, getQueries, saveQuery, updateQuery } from '../controllers/queries';
import { getTranslate } from '../controllers/translates';
import {
    updateContent,
    getContent,
    massMailing,
    getBannedWords,
    updateBannedWords,
    updateWordsForDelete,
    getWordsForDelete,
} from '../controllers/content';
import { adminCreate, adminLogin } from '../controllers/adminka';
import { getPackages, updatePackages } from '../controllers/packages';
import { getOffers, updateOffers } from '../controllers/offers';
import {
    addNewTransaction,
    updateTransaction,
    getTransactions,
    deleteTransaction,
    getTransactionsByUserId,
} from '../controllers/transactions';
import { getPayments, newPayment } from '../controllers/payments';
import { getSettings, updateSettings } from '../controllers/settings';
import {
    updateAvailableAccountMidjourney,
    createAvailableAccountMidjourney,
    getAvailableAccountMidjourney,
} from '../controllers/accountMidjourney';

const routerNoneAuth = express.Router();
routerNoneAuth.post('/signin', login);
routerNoneAuth.post('/getUsers', getUsers);
routerNoneAuth.post('/getUserById', getUserById);
routerNoneAuth.post('/writeOffRequestFromUser', writeOffRequestFromUser);
routerNoneAuth.post('/updateCountFreeQueriesForAllUsers', updateCountFreeQueriesForAllUsers);

routerNoneAuth.post('/getAvailableAccountMidjourney', getAvailableAccountMidjourney);
routerNoneAuth.post('/createAvailableAccountMidjourney', createAvailableAccountMidjourney);
routerNoneAuth.post('/updateAvailableAccountMidjourney', updateAvailableAccountMidjourney);

routerNoneAuth.post('/addNewTransaction', addNewTransaction);
routerNoneAuth.post('/updateTransaction', updateTransaction);
routerNoneAuth.post('/getTransactions', getTransactions);
routerNoneAuth.post('/getTransactionsByUserId', getTransactionsByUserId);
routerNoneAuth.post('/deleteTransaction', deleteTransaction);

routerNoneAuth.post('/saveQuery', saveQuery);
routerNoneAuth.post('/updateQuery', updateQuery);
routerNoneAuth.post('/getQuery', getQuery);
routerNoneAuth.post('/getQueries', getQueries);
routerNoneAuth.post('/findQuery', findOutstandingQuery);

routerNoneAuth.post('/getTranslate', getTranslate);

routerNoneAuth.post('/getContent', getContent);
routerNoneAuth.post('/updateContent', updateContent);
routerNoneAuth.post('/getBannedWords', getBannedWords);
routerNoneAuth.post('/updateBannedWords', updateBannedWords);
routerNoneAuth.post('/getWordsForDelete', getWordsForDelete);
routerNoneAuth.post('/updateWordsForDelete', updateWordsForDelete);
routerNoneAuth.post('/massMailing', massMailing);

routerNoneAuth.post('/adminUserLogin', adminLogin);
routerNoneAuth.post('/adminUserCreate', adminCreate);

routerNoneAuth.post('/getPackages', getPackages);
routerNoneAuth.post('/updatePackages', updatePackages);

routerNoneAuth.post('/getOffers', getOffers);
routerNoneAuth.post('/updateOffers', updateOffers);

routerNoneAuth.post('/newPayment', newPayment);
routerNoneAuth.post('/getPayments', getPayments);

routerNoneAuth.post('/getSettings', getSettings);
routerNoneAuth.post('/updateSettings', updateSettings);

export default routerNoneAuth;
