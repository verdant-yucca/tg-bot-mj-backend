import express from 'express';
import { login } from '../controllers/users';
import { queries } from '../controllers/queries';

const routerNoneAuth = express.Router();
routerNoneAuth.post('/signin', login);
routerNoneAuth.post('/queries', queries);

export default routerNoneAuth;
