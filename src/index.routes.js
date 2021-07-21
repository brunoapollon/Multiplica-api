const { Router } = require('express');
const userRouter = require('./routes/User.routes');
const userAuth = require('./routes/userAuthentication.routes');
const subjectRouter = require('./routes/Subject.routes');
const userTypesRouter = require('./routes/UserTypes.routes');
const rankingRouter = require('./routes/ranking.routes');
const scoreRouter = require('./routes/score.routes');
const questionRouter = require('./routes/question.routes');

const routes = Router();

routes.use(userRouter);
routes.use(userTypesRouter);
routes.use(userAuth);
routes.use(scoreRouter);
routes.use(rankingRouter);
routes.use(subjectRouter);
routes.use(questionRouter);

module.exports = routes;
