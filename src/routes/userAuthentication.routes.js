const { Router } = require('express');
const userAuthentication = require('../controllers/UserAuthentication');

const userAuth = Router();

userAuth.post('/authentication', userAuthentication.store);

module.exports = userAuth;
