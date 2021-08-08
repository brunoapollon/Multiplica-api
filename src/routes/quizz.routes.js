const { Router } = require('express');

const quizzController = require('../controllers/QuizzController');
const AnswerQuizController = require('../controllers/AnswerQuizController');
const QuizzResultsController = require('../controllers/QuizzResultsController');
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

quizzRouter.post(
  '/quizz/answerQuizz/:quizz_id',
  ensureAuthenticated,
  AnswerQuizController.store,
);

quizzRouter.get(
  '/quizz/myResults/show',
  ensureAuthenticated,
  QuizzResultsController.index,
);
quizzRouter.get(
  '/quizz/myResults/:quizz_user_id',
  ensureAuthenticated,
  QuizzResultsController.show,
);
module.exports = quizzRouter;
