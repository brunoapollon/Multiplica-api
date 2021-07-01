const { Router } = require('express');

const userTypeController = require('../controllers/UserTypeController');

const userTypesRouter = Router();

userTypesRouter.post('/userType', userTypeController.store);

module.exports = userTypesRouter;
