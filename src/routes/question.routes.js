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
questionRouter.get(
  '/questions/:question_id',
  ensureAuthenticated,
  QuestionController.show,
);
questionRouter.get(
  '/questions/:subject_id/:level',
  ensureAuthenticated,
  ensuredTeacher,
  QuestionController.index,
);
questionRouter.put(
  '/questions/update/:question_id',
  ensureAuthenticated,
  ensuredTeacher,
  QuestionController.update,
);
questionRouter.delete(
  '/questions/delete/:question_id',
  ensureAuthenticated,
  ensuredTeacher,
  QuestionController.delete,
);
module.exports = questionRouter;
