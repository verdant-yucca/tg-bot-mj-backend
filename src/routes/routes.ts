import express from 'express';
import { login } from '../controllers/users';

const routerNoneAuth = express.Router();
routerNoneAuth.post('/signin', login);

export default routerNoneAuth;
