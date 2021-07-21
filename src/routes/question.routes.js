const { Router } = require('express');

const QuestionController = require('../controllers/QuestionController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const ensuredTeacher = require('../middlewares/ensuredTeacher');

const questionRouter = Router();

questionRouter.post(
  '/questions',
  ensureAuthenticated,
  ensuredTeacher,
  QuestionController.store,
);
module.exports = questionRouter;
