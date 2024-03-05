const routerNoneAuth = require('express').Router();
const { login } = require('../controllers/users');

routerNoneAuth.post('/signin', login);

module.exports = routerNoneAuth;
