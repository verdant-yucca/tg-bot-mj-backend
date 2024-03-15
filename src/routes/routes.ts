import express from 'express';
import { login } from '../controllers/users';
import { getQuery, saveQuery, updateQuery } from '../controllers/queries';

const routerNoneAuth = express.Router();
routerNoneAuth.post('/signin', login);
routerNoneAuth.post('/saveQuery', saveQuery);
routerNoneAuth.post('/updateQuery', updateQuery);
routerNoneAuth.post('/getQuery', getQuery);

export default routerNoneAuth;
