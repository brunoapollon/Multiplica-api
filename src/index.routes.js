const { Router } = require('express');
const userRouter = require('./routes/User.routes');
const userAuth = require('./routes/userAuthentication.routes');
const subjectRouter = require('./routes/Subject.routes');
const userTypesRouter = require('./routes/UserTypes.routes');
const rankingRouter = require('./routes/ranking.routes');
const scoreRouter = require('./routes/score.routes');
const questionRouter = require('./routes/question.routes');
const quizzRouter = require('./routes/quizz.routes');
const addQuestionsInQuizzRouter = require('./routes/addQuestionsInQuizz.routes');

const routesArray = [
  userRouter,
  userAuth,
  subjectRouter,
  userTypesRouter,
  rankingRouter,
  scoreRouter,
  questionRouter,
  quizzRouter,
  addQuestionsInQuizzRouter,
];

const routes = Router();

routesArray.map(route => routes.use(route));

module.exports = routes;
