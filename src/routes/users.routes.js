const { Router } = require('express');

const userController = require('../controllers/UserController');

const userRouter = Router();

userRouter.post('/users', userController.store);
userRouter.get('/users', userController.index);
userRouter.get('/users/:enrollment', userController.show);

module.exports = userRouter;
