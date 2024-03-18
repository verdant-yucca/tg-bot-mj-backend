import express from 'express';
import { login, getUsers } from '../controllers/users';
import { findOutstandingQuery, getQuery, getQueries, saveQuery, updateQuery } from '../controllers/queries';
import { getTranslate } from '../controllers/translates';
import { updateContent, getContent } from '../controllers/content';
import { adminCreate, adminLogin } from '../controllers/adminka';

const routerNoneAuth = express.Router();
routerNoneAuth.post('/signin', login);
routerNoneAuth.post('/getUsers', getUsers);

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

export default routerNoneAuth;
