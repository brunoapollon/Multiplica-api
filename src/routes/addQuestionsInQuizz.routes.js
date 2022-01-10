const { Router } = require('express');

const addQuestionsInQuizz = require('../controllers/AddQuestionsInQuizzController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const ensuredTeacher = require('../middlewares/ensuredTeacher');

const addQuestionsInQuizzRouter = Router();

addQuestionsInQuizzRouter.post(
  '/addQuestionsInQuizz/:quizz_id',
  ensureAuthenticated,
  ensuredTeacher,
  addQuestionsInQuizz.store,
);

module.exports = addQuestionsInQuizzRouter;
