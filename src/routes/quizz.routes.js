const { Router } = require('express');

const quizzController = require('../controllers/QuizzController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const ensuredTeacher = require('../middlewares/ensuredTeacher');

const quizzRouter = Router();

quizzRouter.post(
  '/quizz/:subject_id',
  ensureAuthenticated,
  ensuredTeacher,
  quizzController.store,
);

quizzRouter.get('/quizz/:quizz_id', ensureAuthenticated, quizzController.show);

quizzRouter.get('/quizz', ensureAuthenticated, quizzController.index);

quizzRouter.put(
  '/quizz/:quizz_id',
  ensureAuthenticated,
  ensuredTeacher,
  quizzController.update,
);

quizzRouter.delete(
  '/quizz/:quizz_id',
  ensureAuthenticated,
  ensuredTeacher,
  quizzController.delete,
);
module.exports = quizzRouter;
