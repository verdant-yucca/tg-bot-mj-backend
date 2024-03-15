import express from 'express';
import { login } from '../controllers/users';
import { findOutstandingQuery, getQuery, saveQuery, updateQuery } from '../controllers/queries';

const routerNoneAuth = express.Router();
routerNoneAuth.post('/signin', login);
routerNoneAuth.post('/saveQuery', saveQuery);
routerNoneAuth.post('/updateQuery', updateQuery);
routerNoneAuth.post('/getQuery', getQuery);
routerNoneAuth.post('/findQuery', findOutstandingQuery);

export default routerNoneAuth;
