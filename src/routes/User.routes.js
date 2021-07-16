const { Router } = require('express');

const userController = require('../controllers/UserController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const userRouter = Router();

userRouter.post('/users', userController.store);
userRouter.get('/users', ensureAuthenticated, userController.index);
userRouter.get('/users/:enrollment', ensureAuthenticated, userController.show);
userRouter.put(
  '/users/:enrollment',
  ensureAuthenticated,
  userController.update,
);
userRouter.delete('/users', ensureAuthenticated, userController.delete);

module.exports = userRouter;
