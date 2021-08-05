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

module.exports = quizzRouter;
