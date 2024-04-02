import express from 'express';
import { login, getUsers, getUserById, writeOffRequestFromUser } from '../controllers/users';
import { findOutstandingQuery, getQuery, getQueries, saveQuery, updateQuery } from '../controllers/queries';
import { getTranslate } from '../controllers/translates';
import { updateContent, getContent } from '../controllers/content';
import { adminCreate, adminLogin } from '../controllers/adminka';
import { getPackages, updatePackages } from '../controllers/packages';
import { getOffers, updateOffers } from '../controllers/offers';
import { addNewTransaction, updateTransaction, getTransactions, deleteTransaction } from '../controllers/transactions';

const routerNoneAuth = express.Router();
routerNoneAuth.post('/signin', login);
routerNoneAuth.post('/getUsers', getUsers);
routerNoneAuth.post('/getUserById', getUserById);
routerNoneAuth.post('/writeOffRequestFromUser', writeOffRequestFromUser);

routerNoneAuth.post('/addNewTransaction', addNewTransaction);
routerNoneAuth.post('/updateTransaction', updateTransaction);
routerNoneAuth.post('/getTransactions', getTransactions);
routerNoneAuth.post('/deleteTransaction', deleteTransaction);

routerNoneAuth.post('/saveQuery', saveQuery);
routerNoneAuth.post('/updateQuery', updateQuery);
routerNoneAuth.post('/getQuery', getQuery);
routerNoneAuth.post('/getQueries', getQueries);
routerNoneAuth.post('/findQuery', findOutstandingQuery);

routerNoneAuth.post('/getTranslate', getTranslate);

routerNoneAuth.post('/getContent', getContent);
routerNoneAuth.post('/updateContent', updateContent);

routerNoneAuth.post('/adminUserLogin', adminLogin);
routerNoneAuth.post('/adminUserCreate', adminCreate);

routerNoneAuth.post('/getPackages', getPackages);
routerNoneAuth.post('/updatePackages', updatePackages);

routerNoneAuth.post('/getOffers', getOffers);
routerNoneAuth.post('/updateOffers', updateOffers);

export default routerNoneAuth;
