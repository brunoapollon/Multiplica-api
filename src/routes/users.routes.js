const { Router } = require('express');

const userController = require('../controllers/UserController');

const userRouter = Router();

userRouter.post('/users', userController.store);

module.exports = userRouter;
