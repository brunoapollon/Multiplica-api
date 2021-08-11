const { Router } = require('express');
const multer = require('multer');

const uploadConfig = require('../config/uploadConfig');

const userController = require('../controllers/UserController');
const UpdateAvatarController = require('../controllers/UpdateAvatarController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const userRouter = Router();

userRouter.post('/users', userController.store);

userRouter.get('/users', ensureAuthenticated, userController.index);
userRouter.get('/users/:enrollment', ensureAuthenticated, userController.show);

userRouter.put('/users/update', ensureAuthenticated, userController.update);
userRouter.patch(
  '/users/updateAvatar',
  ensureAuthenticated,
  multer(uploadConfig).single('avatar'),
  UpdateAvatarController.update,
);

userRouter.delete('/users', ensureAuthenticated, userController.delete);

module.exports = userRouter;
